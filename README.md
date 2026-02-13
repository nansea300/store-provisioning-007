# store-provisioning-007
Overview

This project implements a Kubernetes-native multi-tenant store provisioning platform.

It enables users to provision isolated WooCommerce stores dynamically using Helm.

The same architecture is designed to work locally (Minikube/Kind) and in production-like environments (k3s on VPS) using configuration-only changes.

Architecture
Components

Dashboard (React + Vite)

Create store

Delete store

List stores

Displays Helm releases

Backend API (Node.js)

POST /stores → runs helm install

DELETE /stores/:name → runs helm uninstall

GET /stores → runs helm list -A

Orchestration entrypoint

Helm (WooCommerce Chart)

Namespace-per-store

Deployments

Services

PVC for MySQL

Ingress per store

Kubernetes Cluster

Multi-tenant isolation via namespaces

Persistent storage

Ingress exposure

Store Provisioning Flow

User clicks "Create Store"

Backend executes:

helm install <storeName> bitnami/wordpress \
  -n <storeName> \
  --create-namespace


Kubernetes creates:

Namespace

WordPress deployment

MySQL deployment

PVC

Services

Ingress

Store becomes accessible via HTTP.

Deleting a store runs:

helm uninstall <storeName> -n <storeName>


Which removes all associated resources.

Isolation Model

Each store runs in its own namespace.

This guarantees:

Separate PVC

Separate database

Separate ingress

No cross-store resource sharing

This model supports multi-store concurrency safely.

Local Setup (Minikube Example)
minikube start
minikube addons enable ingress


Install backend:

cd backend
npm install
node index.js


Run dashboard:

cd dashboard
npm install
npm run dev

Production-Like Deployment (k3s)

The same Helm commands work on k3s.

Changes required:

Ingress host configuration

StorageClass differences

Production secrets

Resource requests/limits

No code changes required.

System Design Considerations

Helm ensures idempotent provisioning.

Namespace-per-store prevents noisy-neighbor issues.

Backend acts as orchestration gateway.

Horizontal scaling possible for backend and dashboard.

PVC ensures persistent database storage.

Future Improvements

ResourceQuota per namespace

LimitRange enforcement

RBAC for least privilege

Provisioning status tracking

Rate limiting per user

Observability (metrics & logs)
