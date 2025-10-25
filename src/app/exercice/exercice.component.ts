import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.scss']
})
export class ExerciceComponent {

  exerciceForm!: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private router: Router
    ) { }
  
    ngOnInit(): void {
      this.exerciceForm = this.fb.group({
        exercicename: new FormControl('', [Validators.required, Validators.minLength(4)]),
        exercicegroup: new FormControl('', [Validators.required, Validators.min(4)]),
        type: new FormControl('', Validators.required),
      });
    }
  
    addExercice() {
      if (this.exerciceForm.invalid) return;
      // this.authService.addUser({
      //   username: this.exerciceForm.value.username,
      //   password: this.exerciceForm.value.password
      // });
      console.log('Exercice ajoutée avec succès !');
      // this.router.navigate(['/login']);
    }
  
    get getErrorLabel() {
      if (this.exerciceForm.errors?.['required']) return 'Les champs sont obligatoires';
      // if (!!this.exerciceForm.controls?.['password']?.errors?.['minlength']) return `La longueur minimal pour votre mot de passe est ${this.exerciceForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
      // if (this.exerciceForm.errors?.['missMatch']) return 'Les mots de passe ne correspondent pas';
      return 'Formulaire invalide';
    }
  

}
