import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';



interface forms{
  name: FormControl,
  idade: FormControl,
  data:  FormControl,
  convenio:  FormControl,
  beneficios:  FormArray<FormGroup>
}

@Component({
  selector: 'app-form',
  standalone:true,
  imports: [ ReactiveFormsModule, RadioButtonModule, MessageModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponents {
  form!:FormGroup<forms>
  sendedForm = false
  
  constructor(){
    this.form= new FormGroup({
     name:  new FormControl('', Validators.required),
     idade: new FormControl('', Validators.required),
     data: new FormControl('', Validators.required),
     convenio: new FormControl(false),
     beneficios: new FormArray([
        new FormGroup({
          tipo: new FormControl('', Validators.required),
          valor:new FormControl('', Validators.required)
        })
     ])
    }) 
  }

  submit(){
    this.sendedForm = true
    console.log(this.form.value)
  }

  addbenef(){
    const addBenef = new FormGroup({
      tipo: new FormControl('', Validators.required),
      valor:new FormControl('', Validators.required)
    })
    this.beneficios.push(addBenef)
  }

  get beneficios(): FormArray{
    return this.form.get('beneficios') as FormArray
  }


}
