# 🧪 Nhost POC (Proof of Concept)

This is a basic React + Nhost project demonstrating authentication and CRUD operations using Nhost's GraphQL and real-time features.

- Report link: https://docs.google.com/document/d/1qUundinLf_0SJ4O1yr9sBrtPQH9vGp1d0E1eNqGRzgg/edit?usp=sharing

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

Clone this repository using Git:

```bash
git clone https://github.com/your-username/nhost-poc.git
cd nhost-poc/client
```

---

### 2. Install Dependencies

Install all required Node.js packages using npm:

```bash
npm install
```

---

### 3. Create `.env.local` File

Create a `.env.local` file in the root directory of the project and add the following environment variables:

```env
REACT_APP_NHOST_SUBDOMAIN=your_nhost_subdomain
REACT_APP_NHOST_REGION=your_nhost_region
REACT_APP_NHOST_BACKEND_URL=https://your-backend-url.nhost.run
```

You can get these values from your [Nhost Dashboard](https://app.nhost.io/).

---

### 4. Run the Project Locally

Start the development server with the following command:

```bash
npm start
```

Once the server starts, open your browser and go to:

```text
http://localhost:3000
```
