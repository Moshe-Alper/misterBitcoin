export interface Bitcoin {
}


export interface Trade {
    name: string
    value: number
  }
  
  export interface BlockchainTradeVolumeResponse {
    status: string
    name: string
    unit: string
    period: string
    description: string
    values: { x: number; y: number }[]
  }