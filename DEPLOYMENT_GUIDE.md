# NextMoveMath — Production Deployment Guide for nextmovemath.com

Follow these steps to deploy updates to **Vercel** (connected to GitHub and your Namecheap domain).

---

## Updating Your Live Site via GitHub + Vercel

1. Push your updated project files to your `nextmovemath` GitHub repository.
2. Vercel automatically detects the push, runs `npm run build`, and deploys the clean single-page calculator to **https://nextmovemath.com** in ~30 seconds.

---

## Initial Vercel & Namecheap DNS Reference

| Type | Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` | Automatic |
| **CNAME Record** | `www` | `cname.vercel-dns.com` | Automatic |
