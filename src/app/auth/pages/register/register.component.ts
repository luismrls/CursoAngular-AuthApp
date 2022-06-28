import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  miFormulario: FormGroup = this.formBuilder.group({
    name: ['test 1', [Validators.required]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  singUp() {
    console.log(this.miFormulario.value);
    this.router.navigateByUrl('/dashboard');
  }

}
