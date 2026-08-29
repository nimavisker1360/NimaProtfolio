# mavisker.com portfolio

A bilingual English/Turkish portfolio built with the Next.js Pages Router. It presents two connected disciplines: Software & Development and Creative AI & Media. Creative media is stored in Cloudinary; project metadata is stored in MongoDB.

## Local setup

Requirements: Node.js 20.9+ and npm.

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the required values.
3. Generate the two print-ready CV files after resume content changes with `npm run generate:cv`.
4. Start the project with `npm run dev`.

The public site is available at `http://localhost:3000`. The portfolio dashboard is directly available at `/admin/portfolio`; `/admin/login` redirects there without asking for credentials.

## Cloudinary Video setup

1. Create or open a Cloudinary account and copy the cloud name, API key and API secret from its dashboard.
2. Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` locally and in the deployment environment.
3. The application requests a short-lived signed upload from the server, then uploads directly from the browser to Cloudinary. The API secret remains server-only.
4. Video uploads accept MP4, WebM and MOV up to 500 MB. Cover uploads accept JPEG, PNG and WebP up to 10 MB. A lower Cloudinary account limit still applies.
5. Files are stored under `mavisker/portfolio/videos` and `mavisker/portfolio/covers`. Deleting a project also deletes its Cloudinary assets after confirmation.

Do not copy large portfolio videos into `public` or commit them to Git.

## MongoDB setup

1. Create a MongoDB Atlas cluster or use a reachable MongoDB deployment.
2. Create a least-privilege database user and allow network access from the deployment platform.
3. Put the connection string in `MONGODB_URI`, including the database name (for example `...mongodb.net/mavisker`).
4. Mongoose creates the portfolio collection and indexes on first use. No seed is required; add verified projects through the manager.

## Administrator access

The manager intentionally has no username or password. Anyone who can reach `/admin/portfolio` can create, edit, publish, or delete portfolio entries. Admin APIs remain rate-limited, and browser mutations must come from the same origin. For a public deployment, restrict `/admin/*` and `/api/admin/*` at the hosting or reverse-proxy layer if access should not be public.

## Contact form and optional integrations

The contact form sends through Gmail on the server. Set `SMTP_USER` to the Google account that owns the app password, set `SMTP_APP_PASSWORD` to its 16-character app password, and set `CONTACT_TO_EMAIL` to the inbox that should receive submissions. Keep all three values server-only and configure them in the deployment environment as well as `.env.local`. The optional website assistant reads `OPENAI_API_KEY` only from server environment variables.

## Verification and deployment

Run `npm run lint`, `npm run typecheck`, and `npm run build`. Set the same production environment variables in Vercel, redeploy, open `/admin/portfolio`, upload a cover and a test video, save it as a draft, preview it, and publish only after both English and Turkish metadata are verified.
