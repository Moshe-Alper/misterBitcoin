export interface Bitcoin {
}

export interface Trade {
    name: string
    value: number
}

export interface BlockchainTradeVolumeResponse {
    values: {
        x: number
        y: number
    }[]
}