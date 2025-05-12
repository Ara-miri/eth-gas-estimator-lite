import axios from "axios";

export interface GasPrices {
  low: number; // in Gwei
  medium: number; // in Gwei
  high: number; // in Gwei
}

export interface EstimatorOptions {
  apiKey?: string;
}

/**
 * Fetch “low”, “medium” (proposed), and “high” gas-price tiers from Etherscan.
 * @param opts.apiKey Your Etherscan API key (required).
 */
export async function fetchGasPrices(
  opts: EstimatorOptions = {}
): Promise<GasPrices> {
  const { apiKey } = opts;

  if (!apiKey) {
    throw new Error("Etherscan API key is required.");
  }
  const res = await axios.get(
    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`
  );
  if (res.data.status !== "1" || !res.data.result) {
    throw new Error(`Etherscan error: ${res.data.message || "unknown error"}`);
  }
  const { SafeGasPrice, ProposeGasPrice, FastGasPrice } = res.data.result;
  return {
    low: Number(SafeGasPrice),
    medium: Number(ProposeGasPrice),
    high: Number(FastGasPrice),
  };
}
