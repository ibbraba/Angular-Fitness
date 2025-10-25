import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  foodForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.foodForm = this.fb.group({
      foodname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      proteins: new FormControl('', [Validators.required, Validators.min(4)]),
      glucides: new FormControl('', Validators.required),
      lipides: new FormControl('', Validators.required),
    });
  }

  addFood() {
    if (this.foodForm.invalid) return;
    // this.authService.addUser({
    //   username: this.foodForm.value.username,
    //   password: this.foodForm.value.password
    // });
    console.log('Nourriture ajoutée avec succès !');
    // this.router.navigate(['/login']);
  }

  get getErrorLabel() {
    if (this.foodForm.errors?.['required']) return 'Les champs sont obligatoires';
    // if (!!this.foodForm.controls?.['password']?.errors?.['minlength']) return `La longueur minimal pour votre mot de passe est ${this.foodForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    // if (this.foodForm.errors?.['missMatch']) return 'Les mots de passe ne correspondent pas';
    return 'Formulaire invalide';
  }

}
