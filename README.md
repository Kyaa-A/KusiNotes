# KusiNotes 🍎

**Your Personal AI-Powered Meal Planning Assistant**

KusiNotes is a modern web application that helps you create personalized meal plans using AI technology. Whether you're looking to maintain a healthy diet, manage specific dietary requirements, or explore new cuisines, KusiNotes generates customized meal plans tailored to your preferences and nutritional needs.

## ✨ Features

- **AI-Powered Meal Planning**: Generate personalized meal plans using Google Gemini AI
- **Flexible Dietary Options**: Support for various diet types (keto, vegan, paleo, etc.)
- **Allergy Management**: Specify food allergies and dietary restrictions
- **Cuisine Preferences**: Choose from different cuisines and cooking styles
- **Subscription Plans**: Flexible pricing with weekly, monthly, and yearly options
- **User Authentication**: Secure login and profile management with Clerk
- **Payment Processing**: Secure subscription payments with Stripe
- **Responsive Design**: Beautiful, modern UI that works on all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **AI**: Google Gemini API
- **Deployment**: Vercel

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Clerk account
- Stripe account
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/KusiNotes.git
   cd KusiNotes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_postgresql_connection_string"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"

   # Stripe Payments
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
   STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

   # Google Gemini AI
   GOOGLE_AI_API_KEY="your_google_ai_api_key"

   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"

   # Stripe Price IDs (create products in Stripe dashboard)
   STRIPE_PRICE_WEEKLY="price_xxxxx"
   STRIPE_PRICE_MONTHLY="price_xxxxx"
   STRIPE_PRICE_YEARLY="price_xxxxx"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 How to Use

1. **Sign Up**: Create an account using Clerk authentication
2. **Create Profile**: Set up your dietary preferences and restrictions
3. **Choose a Plan**: Select from weekly, monthly, or yearly subscription options
4. **Generate Meal Plans**: Use the AI-powered meal planner to create personalized meal plans
5. **Manage Subscription**: Update or cancel your subscription anytime

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with beautiful gradients
- **Floating Animations**: Subtle fruit animations for visual appeal
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Navigation**: Easy-to-use interface for all skill levels

## 🔧 API Endpoints

- `POST /api/generate-mealplan` - Generate AI-powered meal plans
- `POST /api/checkout` - Create Stripe checkout sessions
- `POST /api/create-profile` - Create user profiles
- `GET /api/check-subscription` - Check subscription status
- `POST /api/profile/change-plan` - Change subscription plans
- `POST /api/profile/unsubscribe` - Cancel subscriptions
- `POST /api/webhook` - Stripe webhook handler

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your app

### Required Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- All the variables from `.env.local`
- Update `NEXT_PUBLIC_APP_URL` to your production domain
- Use real Stripe Price IDs from your Stripe dashboard

## 🔐 Security

- User authentication handled by Clerk
- Secure payment processing with Stripe
- Environment variables for sensitive data
- HTTPS enforced in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/KusiNotes/issues) page
2. Create a new issue with detailed information
3. Contact support at support@kusinotes.com

## 🎯 Roadmap

- [ ] Recipe database integration
- [ ] Shopping list generation
- [ ] Nutrition tracking
- [ ] Social sharing features
- [ ] Mobile app development

---

**Made with ❤️ for healthy eating and better nutrition**