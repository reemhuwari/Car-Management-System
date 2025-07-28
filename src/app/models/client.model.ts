import { UserType } from "../enums/user.enum";

export interface Client {
    id?:string,
    fullName:string,
    email:string,
    password:string,
    confirm_password:string,
    phone:number|null,
    registrationDate:Date|null,
    gender:string,
    terms:boolean|null,
     address: {
    country: string;
    city: string;
    street: string;
  };
    role:UserType
}