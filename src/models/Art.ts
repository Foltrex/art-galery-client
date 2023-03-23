import { Artist } from "./Artist";

export interface Art {
    id?: string;
    name: string;
    description: string;
    artist: Artist;
    dateCreation: Date;
}