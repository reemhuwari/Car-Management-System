import { LookupEnum } from "../enums/lookup.enum";

export interface Lookup {
    id?: number; 
    name: string;
    type: LookupEnum;
    parentId?: number;
}