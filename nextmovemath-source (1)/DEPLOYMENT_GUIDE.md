# NextMoveMath — Production Deployment Guide for nextmovemath.com

Congratulations on launching **NextMoveMath**! Follow these simple steps to deploy your site to **Vercel** or **Cloudflare Pages** and connect your Namecheap domain.

---

## Method 1: Deploy to Vercel (Recommended — Takes ~3 Minutes)

### Step 1: Create a Free Account
1. Go to [vercel.com](https://vercel.com) and sign up for free (using GitHub, Google, or email).

### Step 2: Deploy Your Project
**Option A: Via GitHub (Recommended)**
1. Create a new repository on GitHub named `nextmovemath`.
2. Push your project code to GitHub.
3. In Vercel, click **Add New...** → **Project**, choose your `nextmovemath` repository, and click **Deploy**. Vercel will detect Vite automatically and build in ~30 seconds!

**Option B: Via Vercel CLI (From your terminal)**
```bash
npm install -g vercel
vercel
```
Follow the prompts (defaults are pre-configured in `vercel.json`).

---

## Step 3: Connect your Namecheap Domain (nextmovemath.com)

1. In your **Vercel Project Dashboard**, go to **Settings** → **Domains**.
2. Type `nextmovemath.com` and click **Add**.
3. Recommend selecting: **Add `nextmovemath.com` and redirect `www.nextmovemath.com` to it** (or vice versa).
4. Vercel will display the exact DNS records needed.

5. Now log into **[Namecheap.com](https://www.namecheap.com)**:
   - Go to your **Domain List** → click **Manage** next to `nextmovemath.com`.
   - Click the **Advanced DNS** tab at the top.
   - Under **Host Records**, click **Add New Record**:

   | Type | Host | Value | TTL |
   | :--- | :--- | :--- | :--- |
   | **A Record** | `@` | `76.76.21.21` | Automatic |
   | **CNAME Record** | `www` | `cname.vercel-dns.com` | Automatic |

6. Click the green checkmarks to save.
7. Within 5–15 minutes, Vercel will show a green checkmark next to your domain, automatically generate your free SSL certificate, and **https://nextmovemath.com** is live!

---

## Method 2: Drag-and-Drop Deploy on Netlify (No Git Required)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Unzip `nextmovemath-dist.zip` (the pre-built production files) and drag the `dist` folder right onto the page.
3. Your site is instantly live!
4. Go to **Domain management** → **Add custom domain** → enter `nextmovemath.com`.
5. Point your Namecheap DNS records to Netlify's DNS values.

---

## Google AdSense Setup (Once your domain is live)

1. Go to [google.com/adsense](https://www.google.com/adsense) and log in.
2. Click **Sites** → **Add Site** → enter `https://nextmovemath.com`.
3. AdSense will give you your publisher ID: `ca-pub-XXXXXXXXXXXXXXXX`.
4. Open the AdSense settings modal on your site (press **Ctrl + Shift + A** or **Cmd + Shift + A** anywhere on the page), paste your Publisher ID, and click **Save Settings**.
5. Once Google verifies the site, real high-paying ads will automatically start displaying in the designated prime ad slots!
