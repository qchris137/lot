export type Airport = {
    name: string
    english_name?: string
    city: string
    iata: string
    coordinates: {
        latitude: number
        longitude: number
    }
}

export function nameWithIata(airport: Airport, localizedName: boolean): string {
    return `${
        localizedName ? airport.name : (airport.english_name ?? airport.name)
    } (${airport.iata})`
}