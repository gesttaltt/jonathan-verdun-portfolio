# 🚀 Bootstrap Guide

## 1. Quick Start (Development)

To run the project locally with Hot Module Replacement (HMR):

```bash
# Install dependencies
npm install

# Start development server (accessible at http://localhost:3000)
npm run dev
```

### 📡 LAN Access (Test on Mobile)

To access the site from other devices on your network (e.g., your phone):

```bash
# Bind to all network interfaces
npm run dev -- -H 0.0.0.0
```

_Then assume your computer's IP is `192.168.1.5`, open `http://192.168.1.5:3000` on your phone._

---

## 2. Docker Deployment (Production-Like)

To confirm the build works in a containerized environment:

```bash
# Build and start the container
docker compose up --build
```

- Access at `http://localhost:3000`
- LAN access works automatically (configured in `docker-compose.yml`)

## 3. Production Build (Manual)

To simulate the exact Vercel/Production environment:

```bash
npm run build
npm start
```

## 4. Contracts & Architecture

- **Data Engineering**: `src/lib/contracts/DataEngineeringContract.ts`
- **QA Philosophy**: `src/lib/contracts/QAContract.ts`
- **Infrastructure**: `Dockerfile` (Multi-stage build)
