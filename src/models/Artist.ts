import { Address } from "./Address";

export interface Artist {
    id: string,
    firstname: string,
    lastname: string,
    description: string,
    accountId: string,
    address: Address
}