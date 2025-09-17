import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      webhookSecret
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case "invoice.payment_failed": {
        const session = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(session);
        break;
      }
      case "customer.subscription.deleted": {
        const session = event.data.object as Stripe.Subscription;
        await handleCustomerSubscriptionDeleted(session);
        break;
      }
      default:
        console.log("Unhandled event type" + event.type);
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid signature" }, { status: 400 });
  }
  return NextResponse.json({});
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.clerkUserId;

  if (!userId) {
    console.log("No user id");
    return;
  }

  const subscriptionId = session.subscription as string;

  if (!userId) {
    console.log("No subscription id");
    return;
  }

  try {
    await prisma.profile.update({
      where: { userId },
      data: {
        stripeSubscriptionId: subscriptionId,
        subscriptionActive: true,
        subscriptionTier: session.metadata?.planType || null,
      },
    });
  } catch (error: unknown) {
    console.log("Error updating profile: ", error instanceof Error ? error.message : "Unknown error");
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subId = invoice.subscription as string | null;

  if (!subId) {
    return;
  }

  let userId: string | undefined;
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        stripeSubscriptionId: subId,
      },
      select: {
        userId: true,
      },
    });
    if (!profile?.userId) {
      console.log("No profile found");
      return;
    }
    userId = profile.userId;
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : "Unknown error");
    return;
  }

  try {
    await prisma.profile.update({
      where: { userId: userId },
      data: {
        subscriptionActive: false,
      },
    });
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : "Unknown error");
  }
}
async function handleCustomerSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  const subId = subscription.id;

  let userId: string | undefined;
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        stripeSubscriptionId: subId,
      },
      select: {
        userId: true,
      },
    });
    if (!profile?.userId) {
      console.log("No profile found");
      return;
    }
    userId = profile.userId;
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : "Unknown error");
    return;
  }

  try {
    await prisma.profile.update({
      where: { userId: userId },
      data: {
        subscriptionActive: false,
        stripeSubscriptionId: null,
        subscriptionTier: null,
      },
    });
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : "Unknown error");
  }
}
