System Design & Tradeoffs
Why Namespace-per-Store?

Pros:

Strong isolation

Easy cleanup

Clear resource boundaries

Supports quotas

Tradeoff:

Higher resource overhead vs shared DB model

Chosen for safety and clarity.

Why Helm?

Declarative

Production-ready

Idempotent installs

Supports upgrade/rollback

Clean uninstall

Helm abstracts Kubernetes resource complexity.

Idempotency

Helm prevents duplicate installs for same release name.

Backend could be extended to:

Check existing releases before install

Return proper status codes

Failure Handling

If provisioning fails:

Helm reports error

Namespace can be cleaned manually or retried

Future improvement:

Status tracking DB

Reconciliation loop

Scaling Plan

Backend:

Stateless

Can scale horizontally

Dashboard:

Static frontend

Easily scalable

Provisioning:

Helm executions can be queued

Concurrency control can be added

Stateful components:

MySQL remains single instance per store

Horizontal DB scaling requires different architecture
