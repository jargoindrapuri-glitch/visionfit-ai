
# VisionFit AI: Production Plan & System Architecture

## 1. Product Requirements Document (PRD)

### 1.1 Executive Summary
VisionFit AI is an identity-preserving virtual fitting room platform. It enables e-commerce shoppers to visualize garments on their own bodies using generative AI, reducing sizing uncertainty and lowering return rates for merchants.

### 1.2 Problem Statement
E-commerce return rates average 20-30%, with 70% of those returns attributed to poor fit or style mismatch. Shoppers struggle to translate 2D studio photos to their own unique physiques.

### 1.3 Goals & Success Metrics
- **Primary Goal**: Reduce return rates by 25% for partner merchants.
- **Success Metrics**: 
  - Conversion Rate (CVR) increase of 15%+.
  - Average Session Duration (ASD) increase of 2x.
  - Sub-10s AI generation latency.

### 1.4 User Personas
- **The Conscious Shopper**: Wants to see if a $300 blazer actually fits their frame before committing.
- **The Boutique Merchant**: Wants an "enterprise-grade" tech feel without the $50k custom dev cost.

### 1.5 Functional Requirements
- High-fidelity identity-preserving garment generation.
- Universal product "Import-via-URL" feature.
- Secure user image vault (encrypted).
- Merchant dashboard for analytics and catalog management.

### 1.6 Non-Functional Requirements
- **Latency**: AI results in < 15s.
- **Availability**: 99.9% uptime for the try-on widget.
- **Security**: GDPR/CCPA compliance for personal biometric photos.

---

## 2. Microservices Architecture

VisionFit AI follows a **hexagonal microservices architecture** to separate concerns and scale compute-intensive tasks.

### Service Breakdown:
1.  **API Gateway (Kong)**: Handles rate limiting, authentication, and request routing.
2.  **Auth Service (Supabase Auth)**: Manages JWTs and RBAC.
3.  **Product Service (Node.js/Go)**: Manages the catalog, imports, and merchant data.
4.  **AI Orchestration Service (Python/FastAPI)**: 
    - Wraps Gemini 2.5/3 APIs.
    - Handles image pre-processing (Resizing, Masking).
    - Interfaces with specialized VTON models (IDM-VTON) if secondary processing is needed.
5.  **Try-On History Service**: Manages the persistence of user sessions in Supabase.
6.  **Notification Service**: Handles "Render Ready" alerts via WebHooks or Push.

**Communication**: Services communicate via **gRPC** for low latency internally, and **RabbitMQ** for asynchronous AI generation tasks.

---

## 3. Production-Level Folder Structure

```text
/visionfit-platform
 ├── apps/
 │   ├── web-frontend/        # React 19 / Next.js
 │   ├── admin-dashboard/     # Merchant UI
 ├── services/
 │   ├── ai-worker/           # Python/FastAPI (Image Processing)
 │   ├── core-api/            # Node.js/TypeScript (Business Logic)
 │   ├── auth-service/        # Supabase/Go wrapper
 ├── infra/
 │   ├── terraform/           # GCP/AWS Resource definition
 │   ├── k8s/                 # Kubernetes manifests (ArgoCD)
 ├── packages/
 │   ├── ui-kit/              # Shared Tailwind components
 │   ├── ai-sdk/              # Shared Gemini/Processing wrappers
 ├── docker-compose.yml
 └── README.md
```

---

## 4. Tech Stack Justification
- **Frontend**: React 19 + Tailwind (Speed, standard components).
- **Backend**: Node.js (Core), Python (AI/Computer Vision).
- **Database**: Supabase (PostgreSQL + Real-time + Auth).
- **AI**: Gemini 2.5 Flash (Imaging), Gemini 3 Pro (Reasoning/Sizing).
- **Storage**: GCP Bucket (Image assets) with signed URLs.

---

## 5. API Design (High-level REST)
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/v1/products` | GET | Fetch catalog with filters |
| `/v1/try-on/generate` | POST | Trigger AI generation (returns task_id) |
| `/v1/try-on/status/:id`| GET | Poll for generation result |
| `/v1/user/vault` | GET | Fetch user's previous high-fi renders |

---

## 6. Scalability & Security Plan
- **Horizontal Scaling**: K8s HPA based on CPU/Memory for the AI-Worker.
- **Image Security**: AES-256 encryption at rest for user uploads. Images are purged from transient storage after processing.
- **Rate Limiting**: Tiered limiting (Free users: 5 try-ons/day, Pro: Unlimited).

---

## 7. 80/20 MVP Strategy
**The 80% (Build Now)**:
- Single-image "Import via URL" capability.
- Gemini-powered 2D try-on (Current implementation).
- Supabase for simple session persistence.

**The 20% (Delay/Fake)**:
- Real-time 3D AR Mirror (Manual preview for now).
- Deep Shopify API integration (Use CSV imports initially).
- Custom GPU clusters (Use Gemini serverless for zero infra cost).

**Cost Estimate**: ~$0-50/mo (Free tiers of Supabase, GCP, and Gemini).
**Timeline**: 4 weeks to Production Launch.
