# ARCUS GHCR + GCP Deployment

## Deployment flow

1. `ARCUS GHCR CI` builds the frontend Docker image from `ARCUS-frontend/dockerfile`.
2. The image is pushed to `ghcr.io/<github-owner>/arcus-frontend`.
3. `ARCUS CD` connects to the GCP VM over SSH.
4. The workflow uploads `docker-compose.deploy.yaml` and `conf/nginx.conf`.
5. The VM pulls the exact `sha-<commit>` image from GHCR and restarts the stack with Docker Compose.

## Required GitHub secrets

- `GCP_IP`: Public IP or DNS of the GCP VM
- `GCP_USER`: SSH user on the VM
- `GCP_PRIVATE_KEY`: Private key matching the VM's authorized key

## GCP VM prerequisites

- Docker Engine installed
- Docker Compose plugin installed
- The SSH user can run `docker compose` without `sudo`
- Port `80` open in the GCP firewall

## Runtime files on the VM

- Deployment directory: `/home/<GCP_USER>/arcus-deploy`
- Compose file: `docker-compose.deploy.yaml`
- Nginx config: `conf/nginx.conf`
- Generated env file: `.env`

## Image tags

- `latest`: latest successful main branch image
- `sha-<commit>`: immutable deploy target used by CD

## Manual deploy rerun

`ARCUS CD` supports `workflow_dispatch`, so the same image pull and compose restart can be triggered manually from GitHub Actions.
