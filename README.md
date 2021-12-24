# Vue Web3 Boilerplate
## Overview of the project

## Inspiration

## What is does
### User Stories
- User Story: I can connect my wallet using metamask/Moralis.

## Technical Details
on the frontend i used: 
- [Vue.js 3](https://v3.vuejs.org/) as framework Framework
- [Moralis](https://moralis.io/) to manage auth and store some off-chain data as well as IPFS provider for the assets
- [ethers.js](https://docs.ethers.io/v5/) JS library for interacting with the Ethereum Blockchain and its ecosystem

Blockchain Environment:
- [Hardhat](https://hardhat.org/) - Flexible, extensible and fast Ethereum development environment for professionals.
- [hardhat-deploy]() - Provided utilities for deployments and tasks
- [Chainlink VRF]() - To get random numbers to generate damage
- [Open Zepplin]() - and their contracts and utilities forn ERC721, String, SafeMath, Counters, 
### The contracts
## Installation

### Prerequisites

| Prerequisite                                          | Version |
| ------------------------------------------------------| ------- |
| [MetaMask](https://metamask.io/)                      |         |
| [Moralis](https://moralis.io/)                        |         |
| npm (comes with Node) or yarn (used)                  | `~ ^12.20.0`|
| npm (comes with Node) or yarn (used)                  | `~ ^6.14.8`  |

```shell
node -v
```
#### Cloning the repo

1. Open a Terminal in your projects directory 
2. Clone this repo

```shell
$ git clone YOUR_REPO_URL
```

### setup
```bash
# Install NPM dependencies
npm install
# or If you like yarn
yarn install

```

copy .env.example to .env and change the API KEY:

```bash
cp .env.example .env
```

### running

```bash
# Start the local blockchain in a separate terminal
npm run contract:serve

# Deploy the contracts to the local blockchain
npm run contract:deploy

# run the frontend SPA
npm run dev
```

### testing
```
npm run contract:test
npm run contract:coverage
```

