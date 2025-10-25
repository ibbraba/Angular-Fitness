import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent {

  measureForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.measureForm = this.fb.group({
      age: new FormControl('', Validators.required),
      taille: new FormControl('', [Validators.required, Validators.min(4)]),
      poids: new FormControl('', Validators.required),
    });
  }

  addMeasure() {
    if (this.measureForm.invalid) return;
    // this.authService.addUser({
    //   username: this.measureForm.value.username,
    //   password: this.measureForm.value.password
    // });
    console.log('mesures ajoutée avec succès !');
    // this.router.navigate(['/login']);
  }

  get getErrorLabel() {
    if (this.measureForm.errors?.['required']) return 'Les champs sont obligatoires';
    // if (!!this.measureForm.controls?.['password']?.errors?.['minlength']) return `La longueur minimal pour votre mot de passe est ${this.measureForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    // if (this.measureForm.errors?.['missMatch']) return 'Les mots de passe ne correspondent pas';
    return 'Formulaire invalide';
  }

}
