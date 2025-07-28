import { UserType } from "../enums/user.enum";



interface Customer{
   id?:string|null,
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
export default Customer;