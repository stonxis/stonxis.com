# Stonxis Application

## Environment Setup

This application requires several environment variables to be set up correctly, especially for the authentication system which uses Resend for email delivery.

### Local Development

For local development, the environment variables are stored in the `.env.local` file. This file is automatically loaded by Next.js during development.

### Production Deployment (Netlify)

When deploying to Netlify, you need to manually set up the following environment variables in your Netlify project settings:

1. Go to your Netlify project dashboard
2. Navigate to Site settings > Build & deploy > Environment
3. Add the following environment variables:

```
DATABASE_URL=your_database_url
EMAIL_SERVER_USER=resend
EMAIL_SERVER_HOST=smtp.resend.com
EMAIL_SERVER_PORT=465
EMAIL_SERVER_PASSWORD=your_resend_api_key
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_from_email
NEXT_PUBLIC_APP_URL=your_app_url
AUTH_SECRET=your_auth_secret
```

> **Important**: The `RESEND_API_KEY` is required for the authentication system to work. Without this key, the build will fail with an "API key is missing" error.

### Getting a Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Create an API key from your dashboard
3. Use this key for both `RESEND_API_KEY` and `EMAIL_SERVER_PASSWORD` environment variables

## Build Commands

The application uses the following build command in Netlify:

```
turbo run build --filter application
```

This command runs the build script defined in package.json, which includes generating Prisma client and building the Next.js application.

## Troubleshooting

If you encounter the "API key is missing" error during build:

1. Check that `RESEND_API_KEY` is properly set in your Netlify environment variables
2. Verify that the API key is valid and active in your Resend dashboard
3. Ensure that all other required environment variables are set correctly