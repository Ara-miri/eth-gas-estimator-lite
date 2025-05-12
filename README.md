# eth-gas-estimator-lite

Minimal Ethereum gas price estimator via Etherscan (low/medium/high in Gwei).

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Example](#example)
- [Options](#options)
- [Error Handling](#error-handling)
- [License](#license)

---

## Description

`eth-gas-estimator-lite` is a tiny TypeScript/JavaScript library that fetches “low”, “medium” (proposed), and “high” gas-price tiers from Etherscan’s Gas Oracle API, returning all values in Gwei. It’s ideal for dApps and scripts that need simple, zero-boilerplate gas-price suggestions.

---

## Installation

```bash
npm install eth-gas-estimator-lite axios
```

Or

```bash
yarn add eth-gas-estimator-lite axios
```

---

## Usage

Import and call the `fetchGasPrices` function, supplying your Etherscan API key:

```javascript
import { fetchGasPrices } from "eth-gas-estimator-lite";

(async () => {
  const { low, medium, high } = await fetchGasPrices({
    apiKey: "YOUR_API_KEY",
  });
  console.log(`Low: ${low} Gwei`);
  console.log(`Medium: ${medium} Gwei`);
  console.log(`High: ${high} Gwei`);
})();
```

## API

```typescript
fetchGasPrices(opts: EstimatorOptions): Promise<GasPrices>
```

**Parameters**

- `opts.apiKey` (string, required): Your Etherscan API key.

Returns

- `Promise<GasPrices>` where GasPrices is:

```typescript
interface GasPrices {
  low: number; // SafeGasPrice (Gwei)
  medium: number; // ProposeGasPrice (Gwei)
  high: number; // FastGasPrice (Gwei)
}
```

---

## Example

```typescript
import { fetchGasPrices } from "eth-gas-estimator-lite";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

async function sendTransaction(signer: ethers.Signer) {
  const { low, medium, high } = await fetchGasPrices({
    apiKey: process.env.ETHERSCAN_API_KEY!,
  });

  const tx = await signer.sendTransaction({
    to: "0xRecipientAddressHere",
    value: ethers.utils.parseEther("0.1"),
    gasPrice: ethers.utils.parseUnits(medium.toString(), "gwei"),
  });

  console.log("Transaction hash:", tx.hash);
}
```

---

## Options

The only supported option is:

```typescript
interface EstimatorOptions {
  apiKey: string; // Etherscan API key (required)
}
```

---

## Error Handling

- Throws if `apiKey` is missing or empty.
- Throws if the API call fails, or if Etherscan responds with `status !== '1'`.
- Errors include the Etherscan message when available.

## License

This project is licensed under the `MIT License`. See [LICENSE](https://opensource.org/licenses/MIT) for details.
