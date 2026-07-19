# Stellar Monorepo Submission - Levels 1, 2, and 3

This repository contains the complete progression for the Stellar hackathon/course, neatly organized into `level-1`, `level-2`, and `level-3` directories exactly as required by the evaluator.

## Live Demo
**Live Demo URL:** [https://dao-governance-web3.vercel.app](https://dao-governance-web3.vercel.app) *(Update this to your real URL!)*
*(Note: Ensure you connect to the Vercel project with the Root Directory set to `level-3-orange-belt/frontend`)*

---

## 🏆 Assessment - Level 3: Orange Belt (Final DApp)

Our final level 3 application is a comprehensive web3 platform built on Next.js, featuring complex Soroban cross-contract authentication and real-time live events for a DAO Governance and Treasury platform.

### Proof of Functionality (Level 3 Screenshots)

1. **Mobile Responsive UI:**
   <!-- TODO: Replace the path below with a real screenshot of your app on a phone size -->
   ![Mobile Responsive UI](./assets/mobile_ui.png)

2. **CI/CD Pipeline Running Successfully:**
   <!-- TODO: Replace the path below with a real screenshot of the green checkmarks in GitHub Actions -->
   ![CI/CD Pipeline](./assets/ci_cd_success.png)

3. **Terminal Output (3+ Passing Tests):**
   <!-- TODO: Replace the path below with a real screenshot of `cargo test` passing -->
   ![Cargo Test Output](./assets/cargo_test_success.png)

### Contract Deployment Details (Level 3)
* **Deployed Escrow/Treasury Contract Address:** `CDXOLH55Y6ZKAUHNIS2PL3GO56CRND7VS3P6J36ISWYLH6W2PUPR5NEH`
* **Transaction hash of a contract call:** `9655f80ba616d3d3bc55043c7f384b6a326103b5ede88a0a584ec4368882fab1` *(This is the real Tx hash of funding the treasury)*

---

## 🥈 Assessment - Level 2: Yellow Belt

The Level 2 submission introduces the Soroban smart contracts (Governance core logic) integrated into the upgraded React frontend.

### Proof of Functionality (Level 2 Screenshots)

1. **Wallet Options Available:**
   <!-- TODO: Replace the path below with a real screenshot of the Wallet Kit modal showing Freighter/Albedo -->
   ![Wallet Connect Modal](./assets/wallet_modal.png)

### Contract Deployment Details (Level 2)
* **Deployed Contract Address:** `CB3IKF2OCPH2QRPYHWR5LUO674J2JO7VDUIACCMFUMGTRFK4HBG7E7XT`
* **Transaction hash of a contract call:** `5d8b8e019fb9b0f92d4b9f33f07a221f7e34f8263529321490209805be4f2d34` *(Placeholder - Update this if needed!)*

---

## 🥉 Assessment - Level 1: White Belt

The foundation of the project containing the basic Next.js frontend with the Stellar Wallets Kit and Horizon API integration to display the user's XLM balance.

---

## CI/CD Pipeline
This repository includes a strict `ci.yml` pipeline in the `.github/workflows/` directory that automatically tests the Rust smart contracts and builds the Next.js frontend upon every push to the `main` branch.

## Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Be-bibek/DAO-Governance-web3.git
   cd DAO-Governance-web3
   ```

2. **Navigate to the final Level 3 code:**
   ```bash
   cd level-3-orange-belt/frontend
   npm install
   npm run dev
   ```

3. **Test the Smart Contracts:**
   ```bash
   cd level-3-orange-belt/contracts
   cargo test
   ```
