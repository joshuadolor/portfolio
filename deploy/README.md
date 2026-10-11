# Deploy checklist (Ubuntu + Docker + GitHub Actions)

This portfolio is built in GitHub Actions, published to GHCR as `ghcr.io/joshuadolor/portfolio`, and pulled on the Ubuntu server via SSH.

## 1. Ubuntu server setup

```bash
# Docker Engine + Compose plugin (follow current Docker docs for Ubuntu)
sudo apt update
sudo apt install -y ca-certificates curl
# ... install docker-ce, docker-ce-cli, containerd.io, docker-compose-plugin

# Host reverse proxy + TLS
sudo apt install -y nginx certbot python3-certbot-nginx

# Deploy user (example)
sudo useradd -m -s /bin/bash deploy
sudo usermod -aG docker deploy

# Deploy directory
sudo mkdir -p /opt/portfolio
sudo chown deploy:deploy /opt/portfolio
```

Copy `docker-compose.yml` from this repo into `/opt/portfolio/docker-compose.yml` (or clone the repo there and keep it in sync).

### GHCR login on the server

Create a GitHub Personal Access Token (classic) with `read:packages`, then:

```bash
echo YOUR_PAT | docker login ghcr.io -u joshuadolor --password-stdin
```

If the package is private, also make sure the token/user can read it. After the first Actions publish, you may need to set package visibility to public (or grant the deploy user access) under GitHub → Packages.

### Host nginx + DNS

1. Point `joshuadolor.com` and `www` A/AAAA records to this server’s public IP.
2. Install the site config from [`host-nginx.conf.example`](./host-nginx.conf.example).
3. Open firewall ports `80` and `443`.
4. Issue certificates: `sudo certbot --nginx -d joshuadolor.com -d www.joshuadolor.com`.

### SSH key for Actions

On your laptop (or CI secrets machine):

```bash
ssh-keygen -t ed25519 -C "github-actions-portfolio" -f ./portfolio_deploy_ed25519 -N ""
```

Add the **public** key to the server user’s `~/.ssh/authorized_keys`. Store the **private** key in GitHub as `SSH_PRIVATE_KEY`.

## 2. GitHub Actions secrets

Repo → **Settings → Secrets and variables → Actions** → add:

| Secret | Value |
|--------|--------|
| `SSH_HOST` | Server IP or hostname |
| `SSH_USER` | e.g. `deploy` |
| `SSH_PRIVATE_KEY` | Full private key PEM contents |
| `SSH_PORT` | Optional; defaults to `22` if omitted |

`GITHUB_TOKEN` is provided automatically and is used to push images to GHCR (`packages: write` is set in the deploy workflow).

## 3. First deploy

1. Merge the CI/CD files to `master`.
2. Confirm **CI** and **Deploy** workflows succeed under the Actions tab.
3. On the server, verify: `docker compose -f /opt/portfolio/docker-compose.yml ps`
4. Visit `https://joshuadolor.com` and confirm traffic hits this server (not Hostinger).

## Local Docker smoke test

```bash
docker build -t portfolio:local .
docker run --rm -p 8080:80 portfolio:local
# open http://localhost:8080
```
