# Coinvote.cash Deployment Guide

This guide provides step-by-step instructions for deploying the Coinvote.cash application to Vercel.

## Prerequisites

1. A Vercel account
2. A Neon PostgreSQL database (set up with credentials)
3. Redis instance via Upstash (set up with credentials)
4. Firebase project for authentication (optional but recommended)

## Deployment Steps

### 1. Configure Environment Variables

Ensure the following environment variables are set in your Vercel project:

```
# Database
DATABASE_URL="postgres://username:password@host.neon.tech/dbname?sslmode=require"

# Redis
UPSTASH_REDIS_REST_URL="redis://default:password@host.redns.redis-cloud.com:port"

# Next.js
NEXT_PUBLIC_SITE_URL="https://your-deployed-domain.com"

# Firebase (Optional)
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
```

### 2. Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in your Vercel dashboard
3. Configure the environment variables as listed above
4. Deploy the project

### 3. Initialize the Database

After successful deployment, initialize the database by either:

#### Option 1: Using the browser
Visit `https://your-deployed-domain.com/api/init-db` in your browser

#### Option 2: Using the provided script
Run the following command:
```bash
node scripts/init-db.js https://your-deployed-domain.com
```

This will create all necessary database tables and seed them with initial data.

### 4. Verify Deployment

1. Visit your deployed site
2. Check that the homepage loads correctly
3. Verify that the coin listings are displayed
4. Test any interactions that require database access

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Verify your `DATABASE_URL` is correct
2. Ensure your IP is allowed in Neon's connection settings
3. Check that the database user has appropriate permissions

### Build Errors

If you encounter build errors:

1. Check Vercel build logs for specific error messages
2. If TypeScript errors are preventing deployment, they are configured to be ignored but may need fixing for production
3. For deployment without fixing TypeScript errors, make sure `typescript.ignoreBuildErrors` is set to `true` in `next.config.mjs`

## Production Considerations

For a production deployment:

1. Set up monitoring and analytics (Vercel Analytics recommended)
2. Configure appropriate caching strategies
3. Set up a custom domain with SSL
4. Implement rate limiting for API routes
5. Consider adding a CDN for global distribution 