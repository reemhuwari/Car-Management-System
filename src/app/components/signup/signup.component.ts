import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from '../../validators.service';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import Customer from '../../models/customer.model';
import { UserType } from '../../enums/user.enum';
import { Client } from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';
import { LookupService } from '../../services/lookup.service';
import { Lookup } from '../../models/lookup.model';
import { LookupEnum } from '../../enums/lookup.enum';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-signup',
  standalone:false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  countries!:Lookup[]
  cities!:Lookup[]
  lookups: string[] = [];
   id!:Lookup;
  name!:Lookup 
  parentId!:Lookup
  formGroup!: FormGroup;

  constructor( public validatorsService: ValidatorsService,private httpClient:HttpClient,private customersService:CustomersService,private clientService:ClientsService,private lookupService:LookupService, private fb: FormBuilder, ) {
    
  }
  
  ngOnInit():void {
     this.formGroup = this.initFormGroup();
    this.lookupService.getAll(LookupEnum.country).subscribe(
      (data:any)=>{
        this.countries=data;
      },
      (error:any)=>{
        console.log(error)
      }
    )
  
    
  }
  countryChange(country:string):void{
    this.cities=[]
    this.lookupService.getAll(LookupEnum.city,country).subscribe(
      (data:any)=>{
        this.cities=data;
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }

  genders = [
    { key: 'male', label: 'ذكر' },
    { key: 'female', label: 'انثى' }
  ]
  
  
  
  formNameMapper:{ [key: string]: string } = {
    fullName: 'الاسم كامل',
    email: 'البريد الاكتروني',
    password: 'كلمة السر',
    confirm_password: 'تاكيد كلمة السر',
    phone:'الهاتف',
    registrationDate: 'تاريخ التسجيل',
    gender: 'الجنس',
    terms: 'الشروط والاحكام'
    
  }
  

  //formGroup: FormGroup = this.initFormGroup();
  errors: string[] = [];
  initFormGroup(): FormGroup {
  return this.fb.group({
      fullName: new FormControl('', Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required ,Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]),

      confirm_password: new FormControl('', Validators.required),
      phone:new FormControl('',[Validators.required,Validators.min(10)]),
      registrationDate: new FormControl(''),
      gender: new FormControl(''),
      terms: new FormControl(''),
      address: this.fb.group({
        country: new FormControl(''),
        city: new FormControl(),
        street: new FormControl(''),
       
      }),
      role:new FormControl(''),
    });

  }
   
 customer:Customer={
    fullName:'',
    email:'',
    password:'',
    confirm_password:'',
    phone:null,
    registrationDate:null,
    gender:'',
    terms:null,
    address:{
      country:'',
    city:'',
    street:'',
    },
    
    role:UserType.customer
  }
  client:Client={
    fullName:'',
    email:'',
    password:'',
    confirm_password:'',
    phone:null,
    registrationDate:null,
    gender:'',
    terms:null,
    address:{
      country:'',
    city:'',
    street:'',
    },
    role:UserType.client
  }
  onSubmit():void {
    this.formGroup.markAllAsTouched();
    this.errors.length = 0;
    if (!this.formGroup.valid) { // form group invalid
      Object.keys(this.formGroup.controls).forEach((key: string) => {
        const name = this.formNameMapper[key];
        if (this.formGroup.controls[key].errors?.['required']){
          this.errors.push(`${name} مطلوب`)
        }
        else if (this.formGroup.controls[key].errors?.['email']) {
          this.errors.push(`${name} البريد الالكتروني غير صحيح`)
         
      }} )
  }else { //this form group valid
      const formValues = this.formGroup.value;

// استخراج بيانات العنوان
const address = formValues.address || {};

this.customer = {
  ...formValues,
  country: address.country || '',
  city: address.city || '',
  street: address.street || '',
  role: formValues.role || UserType.customer,
};

this.client = {
  ...formValues,
  country: address.country || '',
  city: address.city || '',
  street: address.street || '',
  role: formValues.role || UserType.client,
};

      console.log(this.customer);
        if(this.customer.role === UserType.customer){
       this.customersService.addCustomers(this.customer).subscribe({
        next:(data:any)=>{
          console.log(data);
          alert("نجاح التسجيل.");
        },
        error:(error:any)=>{
          alert('فشل التسجيل.');
        }
    });
     }else if(this.client.role === UserType.client){
      this.clientService.addClient(this.client).subscribe({
        next:(data:any)=>{
          alert("نجاح التسجيل.");
        },
        error:(error:any)=>{
          alert('فشل التسجيل.');
        }
    });
     }
    }
  }

  
  
  checkValidValue(fieldName: string): boolean {
    return this.formGroup.controls[fieldName].touched && this.formGroup.controls[fieldName].valid
  }

  checkNotValidValue(fieldName: string): boolean {
    return this.formGroup.controls[fieldName].touched && !this.formGroup.controls[fieldName].valid
  }
}

