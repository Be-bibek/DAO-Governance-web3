# Nexus DAO: Production-Ready Governance Platform

## Level 3 (L3) Assessment Project

Nexus DAO is a fully decentralized treasury and voting platform built on the Stellar/Soroban network, satisfying all requirements of the Level 3 Web3 curriculum.

## Architecture

```mermaid
graph TD
    User([User / Voter]) -->|Freighter Wallet| Frontend(Next.js Frontend)
    
    subgraph Frontend [Frontend Application]
        Dashboard[Proposals Dashboard]
        VoteUI[Voting Interface]
        Poll[Horizon Real-Time Poller]
    end
    
    Frontend -->|Submit Transaction| RPC[Soroban RPC]
    Poll -->|Stream Events| Horizon[Stellar Horizon API]
    
    subgraph Soroban [Smart Contracts]
        Gov[Governance Contract]
        Treasury[Treasury Contract]
        Token[Stellar Asset Token]
    end
    
    RPC --> Gov
    
    Gov -->|1. Create Proposal| Gov
    Gov -->|2. Cast Vote| Gov
    Gov -.->|3. Cross-Contract Execute| Treasury
    Treasury -.->|4. Release Funds| Token
```

## Test Sketches & Validation

To ensure enterprise-grade security for the DAO funds, the project includes comprehensive integration tests. Here is a sketch of the testing architecture validating the core DAO lifecycle:

```mermaid
sequenceDiagram
    participant TestEnv as Rust Test Env
    participant Gov as Governance Contract
    participant Treasury as Treasury Contract
    
    TestEnv->>Gov: 1. create_proposal(amount, recipient)
    Gov-->>TestEnv: returns proposal_id
    
    TestEnv->>Gov: 2. vote(proposal_id, true)
    Note over Gov: State: Votes = 1
    
    TestEnv->>Gov: 3. execute(proposal_id)
    Gov->>Treasury: 4. Cross-Contract Call: withdraw()
    Note over Treasury: Verifies caller == Governance Contract
    Treasury-->>Gov: Success
    Gov-->>TestEnv: Proposal Executed & Funds Released
    
    TestEnv->>Treasury: 5. Malicious Direct withdraw()
    Treasury-->>TestEnv: Error: Unauthorized
```

- **Advanced Contracts (Part A & B)**: Two interacting contracts (Treasury and Governance) enforcing cryptographic security.
- **Real-Time Events (Part C)**: Frontend polls the Horizon API to instantly update the UI when a vote is cast.
- **Responsive UI (Part F)**: Glassmorphism TailwindCSS dashboard built with Next.js and Shadcn/ui.
- **Robust Error Handling (Part G)**: Deep integration with Soroban VM error codes translated to user-friendly Toast notifications.
- **CI/CD Pipeline (Part D)**: GitHub Actions configured for both Rust (`cargo test`) and Frontend (`npm run build`).
- **Testing (Part H)**: Comprehensive smart contract integration testing simulating the full DAO lifecycle.
