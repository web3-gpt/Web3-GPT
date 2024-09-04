declare module "solc" {
  import type { Abi } from "viem"

  export type SolcInputSources = {
    [fileName: string]: {
      content: string
    }
  }

  export type SolcInput = {
    language: "Solidity"
    sources: SolcInputSources
    settings: {
      optimizer: {
        enabled: boolean
        runs: number
      }
      outputSelection: {
        "*": {
          "*": string[]
        }
      }
    }
  }

  export type Bytecode = {
    functionDebugData: Record<
      string,
      {
        entryPoint: number | null
        id: number | null
        parameterSlots: number
        returnSlots: number
      }
    >
    generatedSources: Array<{
      ast: object
      contents: string
      id: number
      language: string
      name: string
    }>
    linkReferences: Record<string, Record<string, Array<{ length: number; start: number }>>>
    object: string
    opcodes: string
    sourceMap: string
  }

  export type Contract = {
    abi: Abi
    devdoc: {
      kind: string
      methods: Record<string, unknown>
      version: number
    }
    evm: {
      assembly: string
      bytecode: Bytecode
      deployedBytecode: Bytecode
      gasEstimates: {
        creation: {
          codeDepositCost: string
          executionCost: string
          totalCost: string
        }
        external: Record<string, string>
      }
      legacyAssembly: object
      methodIdentifiers: Record<string, string>
    }
    metadata: string
    storageLayout: {
      storage: Array<{
        astId: number
        contract: string
        label: string
        offset: number
        slot: string
        type: string
      }>
      types: Record<
        string,
        {
          encoding: string
          label: string
          numberOfBytes: string
        }
      >
    }
    userdoc: {
      kind: string
      methods: Record<string, unknown>
      version: number
    }
  }

  export type CompilationError = {
    component: string
    errorCode: string
    formattedMessage: string
    message: string
    severity: "error" | "warning"
    sourceLocation?: {
      end: number
      file: string
      start: number
    }
    type: string
  }

  export type SolcOutput = {
    contracts: {
      [fileName: string]: {
        [contractName: string]: Contract
      }
    }
    sources: {
      [fileName: string]: {
        content: string
      }
    }
    errors?: CompilationError[]
  }

  function compile(input: string, readCallback?: (path: string) => { contents: string } | { error: string }): string

  const solc: {
    compile: typeof compile
  }

  export default solc
}
