import { City } from "./City";

export interface Address {
    id?: string,
    city: City,
    fullName: string
}