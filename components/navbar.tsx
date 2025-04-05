"use client";

import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) return <p>Loading...</p>;
  return (
    <nav>
      {""}
      <div>
        <Link href="/">
          <Image src="/logo.png" width={60} height={60} alt="logo" />
        </Link>
      </div>

      <div>
        {""}
        <SignedIn>
          <Link href="/mealplan">Mealplan</Link>
          {user?.imageUrl ? (
            <Link href="/profile">
              <Image
                src={user.imageUrl}
                width={40}
                height={40}
                alt="Profile Picture"
              />{" "}
            </Link>
          ) : (
            <div></div>
          )}
        </SignedIn>
        <SignedOut></SignedOut>
      </div>
    </nav>
  );
}
