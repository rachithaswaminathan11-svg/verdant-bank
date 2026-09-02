# Verdant ESG & Carbon Monitor

A React + Vite recreation of the Verdant ESG dashboard, prepared for Supabase integration.

## Run locally

1. Install Node.js 18+.
2. Open this folder in VS Code.
3. Run:
   npm install
   npm run dev

## Connect Supabase

Create a `.env` file from `.env.example`:

VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

The project already contains the Supabase client. It will load branch records from the `public.branches` table when valid environment variables are present.

Do NOT put a Supabase service-role key in the frontend.

## Deploy to Vercel

Push this project to GitHub, import the repository into Vercel, and add the same two environment variables in Vercel Project Settings > Environment Variables.

Build command: `npm run build`
Output directory: `dist`
