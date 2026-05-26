# My Portfolio — bsingh.dev

Personal portfolio site for myself.

Built with Next.js 14 (App Router), Framer Motion, and Tailwind. Designed for self-hosting on a Linux VPS behind Nginx + PM2

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Editing content

All site content (name, projects, skills, achievements, hero copy) lives in **one file**:

```
lib/content.ts
```

Edit that file, save, and every section updates automatically. No need to touch components for content changes.

## Replacing assets

- **Logo image** → `public/logo.jpg` (and `public/logo.webp` if you want a webp version too)
- **Favicon** → `public/favicon.png`
- **Resume PDF** → `public/resume.pdf` (currently a placeholder, replace with your real one)

## Deploying to the VPS

This follows the same pattern as your Vault project, but for a Next.js Node app instead of a static frontend.

### 1. DNS

Point `your domain` (root) to the new VPS's IP via your DNS provider. Add an A record for `@` and one for `www`. Wait for propagation (a few minutes).

### 2. On the VPS

```bash
# Install Node 20 if not already:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Clone your repo
git clone <your-repo-url> /var/www/bsingh-portfolio
cd /var/www/bsingh-portfolio

# Install + build
npm ci
npm run build

# Set env vars (for the contact form). Create .env.production.local:
cat > .env.production.local <<'EOF'
RESEND_API_KEY=re_your_key_here
CONTACT_TO=hello@bsingh.dev
CONTACT_FROM=BSingh Portfolio <noreply@bsingh.dev>
EOF

# Run with PM2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup   # follow the printed command
```

The app listens on **port 3001** (set in `package.json`'s `start` script — change there if you want a different port).

### 3. Nginx config

Create `/etc/nginx/sites-available/bsingh.dev`:

```nginx
server {
    listen 80;
    server_name bsingh.dev www.bsingh.dev;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable + reload:

```bash
sudo ln -s /etc/nginx/sites-available/bsingh.dev /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. SSL

```bash
sudo certbot --nginx -d bsingh.dev -d www.bsingh.dev
```

### 5. Deploy updates later

```bash
cd /var/www/bsingh-portfolio
git pull
npm ci
npm run build
pm2 restart portfolio
```

## Email setup (one-time, for contact form + custom email)

1. **Cloudflare Email Routing** — log in to Cloudflare → bsingh.dev → Email → Routing. Set up `hello@bsingh.dev` to forward to your personal Gmail. Free, instant.
2. **Resend** — sign up at https://resend.com (free 3k/month). Add `your domain` as a verified domain (DNS records they give you, add to Cloudflare). Generate an API key, paste it into `.env.production.local` as `RESEND_API_KEY`.

Without `RESEND_API_KEY` set, the contact form silently no-ops on the server but still shows success to the visitor — useful for testing.

## File structure

```
app/
  layout.tsx        Root layout, fonts, metadata
  page.tsx          Home page composition
  globals.css       Theme variables and base styles
  api/contact/      Contact form endpoint (Resend)
components/         All UI components (Hero, Projects, Stats, etc.)
lib/
  content.ts        ⭐ Single source of truth — edit this for content updates
public/
  logo.jpg          Avatar image
  favicon.png       Tab icon
  resume.pdf        Downloadable resume (replace this!)
```

## Notes

- Theme persists in localStorage. Defaults to dark.
- GitHub stats fetch live from `https://api.github.com/users/BSinghOP` on first paint. Falls back to hardcoded values from `content.ts` if the API is rate-limited or down.
- All fonts (JetBrains Mono + Geist) load via `next/font` — no FOUC, theme-safe.
