# Gadgethub Contract Testing Project

This repository contains my first complete **contract testing** project powered by **Specmatic** and **Playwright**.
The project models a simple microservices architecture:

- **Gadget API** – Provider service that exposes REST endpoints.
- **Gadget Dashboard** – Consumer application (UI, coming soon) that consumes the API.

The OpenAPI contract is the single source of truth between both services.

---

## 🧪 What Is Being Tested

During the first stage of the project, the focus is on **consumer-side contract testing**:

- Validating that API responses match the OpenAPI contract.
- Using Specmatic to generate a contract-based stub.
- Using Playwright as the consumer to execute contract tests against the stub.

Specmatic performs the contract validation, while Playwright acts only as the API consumer.

---

## 🚀 How to Run the Project
Run the following commands in your terminal:

1. **Clone or download the repository:**
   ```bash
   git clone https://github.com/BernardoSJ/gadgethub-contract-testing-project.git
   ```
2. **Navigate to the project folder and install dependencies (only the first time):**
   ```bash
   cd gadgethub-contract-testing-project
   npm install
   ```
3. **Start the Specmatic stub server:**
   ```bash
   npm run specmatic:stub
   ```
4. **In another terminal, run the tests:**
    ```bash
   npx playwright test tests/contracts/gadgets.contract.spec.ts
   ```

---

## 🧩 Project Structure

```text
gadgethub-contract-testing-project/
  ├── provider-api/             # Provider API containing the OpenAPI contract
  │   └── openapi/
  │       └── gadgets.yaml     # Main API contract
  ├── specmatic/                # Specmatic JAR
  ├── tests/                    # Contract tests (Playwright)
  ├── playwright.config.ts      # Playwright configuration file
  └── package.json              # Dependencies and npm scripts
```