# Joshua Dolor — Portfolio

Vite + React portfolio site.

## Scripts

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
npm run lint
npm run preview
```

## CI/CD

GitHub Actions:

- **CI** (`.github/workflows/ci.yml`) — lint + build on push/PR to `master`
- **Deploy** (`.github/workflows/deploy.yml`) — build/push Docker image to GHCR, then SSH deploy to the Ubuntu server

Docker serves the static build with nginx inside the container; host nginx terminates TLS and proxies to `127.0.0.1:8080`.

**What you need to configure:** see [deploy/README.md](deploy/README.md) for server setup, GHCR login, DNS, Certbot, and GitHub Actions secrets (`SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, optional `SSH_PORT`).
