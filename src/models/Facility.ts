import { Address } from "./Address";
import { Organization } from "./Organization";

export interface Facility {
    id: string,
    name: string,
    isActive: boolean,
    address: Address,
    organization: Organization
}