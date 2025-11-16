import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FitnessService } from '../shared/services/fitness.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent {

  measureForm!: FormGroup;
  userId:  string | null = null;

  constructor(
    private fb: FormBuilder,
    private fitnessService: FitnessService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.measureForm = this.fb.group({
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(4)]),
      taille: new FormControl('', [Validators.required, Validators.min(4)]),
      poids: new FormControl('', Validators.required),
    });

    this.userId = this.authService.getSavedUser();
  }

  addMeasure() {


    if (this.measureForm.invalid) return;
    this.fitnessService.addMeasure({
      gender: this.measureForm.value.gender,
      age: this.measureForm.value.age,
      taille: this.measureForm.value.taille,
      poids: this.measureForm.value.poids
    }, this.userId! ).subscribe({
      next: (recapId) => {
        console.log('✅ Recap created with ID in component:', recapId);
        this.router.navigate(['/food', this.userId, recapId]);
      },
      error: (err) => {
        console.error('Error creating recap:', err);
      },
    }); 
  }

  get getErrorLabel() {
    if (this.measureForm.errors?.['required']) return 'Les champs sont obligatoires';
    // if (!!this.measureForm.controls?.['password']?.errors?.['minlength']) return `La longueur minimal pour votre mot de passe est ${this.measureForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    // if (this.measureForm.errors?.['missMatch']) return 'Les mots de passe ne correspondent pas';
    return 'Formulaire invalide';
  }

}