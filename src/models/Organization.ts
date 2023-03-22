import { Address } from "./Address";
import { Facility } from "./Facility";
import { OrganizationStatusEnum } from "./OrganizationStatusEnum";

export interface Organization {
    id: string,
    name: string,
    address: Address | null,
    status: OrganizationStatusEnum,
    facilities: Facility[]
}
