import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FitnessService } from '../shared/services/fitness.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  foodForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fitnessService: FitnessService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.foodForm = this.fb.group({
      foodname: new FormControl('', Validators.required),
      proteins: new FormControl('', [Validators.required, Validators.min(4)]),
      glucides: new FormControl('', Validators.required),
      lipides: new FormControl('', Validators.required),
    });
  }

  addFood() {
    if (this.foodForm.invalid) return;
    this.fitnessService.addFood({
      foodname: this.foodForm.value.foodname,
      proteins: this.foodForm.value.proteins,
      glucides: this.foodForm.value.glucides,
      lipides: this.foodForm.value.lipides
    });
    console.log('Nourriture ajoutée avec succès !');
    this.foodForm.reset();
    this.router.navigate(['/food']);
  }

  goToNextStep() {
    this.router.navigate(['/exercise']);
  }

  get getErrorLabel() {
    if (this.foodForm.errors?.['required']) return 'Les champs sont obligatoires';
    // if (!!this.foodForm.controls?.['password']?.errors?.['minlength']) return `La longueur minimal pour votre mot de passe est ${this.foodForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    // if (this.foodForm.errors?.['missMatch']) return 'Les mots de passe ne correspondent pas';
    return 'Formulaire invalide';
  }

}
