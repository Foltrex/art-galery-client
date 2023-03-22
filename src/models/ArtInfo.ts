import { Art } from "./Art";
import { Currency } from "./Currency";
import { Facility } from "./Facility";
import { Organization } from "./Organization";

export interface ArtInfo {
    id: string;
    art: Art;
    organization: Organization;
    facility: Facility;
    price: string;
    currency: Currency;
    comission: number;
    creationDate: Date;
    expositionDateStart: Date;
    expositionDateEnd: Date;
    status: 'INACTIVE' | 'ACTIVE' | 'SOLD' | 'RETURN';
}