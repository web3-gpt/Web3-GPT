import { Chain } from 'viem'
import * as allViemChains from 'viem/chains'
import { mantleSepolia } from './mantle-sepolia'

const { ...chains } = allViemChains

const holeskyWithBlockExplorer = {
  ...chains.holesky,
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://holesky.etherscan.io'
    }
  }
}

export function getChainById(chainId: number) {
  if (chainId === mantleSepolia.id) {
    return mantleSepolia
  }
  if (chainId === chains.holesky.id) {
    return holeskyWithBlockExplorer
  }
  for (const chain of Object.values(chains)) {
    if (chain.id === chainId) {
      return chain
    }
  }

  throw new Error(`Chain with id ${chainId} not found`)
}

export const API_URLS: Record<Chain['id'], string> = {
  1: 'https://api.etherscan.io/api',
  17000: 'https://api-holesky.etherscan.io/api',
  11155111: 'https://api-sepolia.etherscan.io/api',
  421613: 'https://api-goerli.arbiscan.io/api',
  80001: 'https://api-testnet.polygonscan.com/api',
  420: 'https://api-goerli.optimistic.etherscan.io/api',
  84532: 'https://api-sepolia.basescan.org/api',
  5003: 'https://explorer.sepolia.mantle.xyz/api'
}

export const API_KEYS: Record<Chain['id'], string> = {
  1: `${process.env.ETHEREUM_EXPLORER_API_KEY}`,
  17000: `${process.env.ETHEREUM_EXPLORER_API_KEY}`,
  11155111: `${process.env.ETHEREUM_EXPLORER_API_KEY}`,
  421613: `${process.env.ARBITRUM_EXPLORER_API_KEY}`,
  80001: `${process.env.POLYGON_EXPLORER_API_KEY}`,
  420: `${process.env.OPTIMISM_EXPLORER_API_KEY}`,
  84532: `${process.env.BASE_EXPLORER_API_KEY}`,
  5003: `${process.env.MANTLE_EXPLORER_API_KEY}`
}

export const getExplorerUrl = (viemChain: Chain): string | undefined => {
  if (viemChain.id === chains.holesky.id) {
    return holeskyWithBlockExplorer.blockExplorers?.default.url
  }

  return viemChain?.blockExplorers?.default.url
}
