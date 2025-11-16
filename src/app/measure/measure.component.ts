import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FitnessService } from '../shared/services/fitness.service';
import { AuthService } from '../auth/auth.service';

export interface MeasureData {
  gender: 'male' | 'female';
  age: number;
  taille: number;
  poids: number;
  goalWeight?: number;
  timelineWeeks?: number;
}

export interface FoodData {
  foodname: string;
  proteins: number;
  glucides: number;
  lipides: number;
}

export interface ExerciseData {
  exercisename: string;
  exercisegroup: string;
  type: string;
}

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  standalone: false,
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent {
  measureForm!: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private fitnessService: FitnessService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.measureForm = this.fb.group({
      gender: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      taille: new FormControl('', [Validators.required, Validators.min(100)]),
      poids: new FormControl('', [Validators.required, Validators.min(20)]),
      goalWeight: new FormControl('', Validators.required),
      timelineWeeks: new FormControl('', [Validators.required, Validators.min(1)])
    });

    this.userId = this.authService.getSavedUser();
  }

  addMeasure() {
    if (this.measureForm.invalid) return;

    const measureData: MeasureData = {
      gender: this.measureForm.value.gender,
      age: this.measureForm.value.age,
      taille: this.measureForm.value.taille,
      poids: this.measureForm.value.poids,
      goalWeight: this.measureForm.value.goalWeight,
      timelineWeeks: this.measureForm.value.timelineWeeks
    };

    // Sauvegarder dans la base de données
    this.fitnessService.addMeasure(measureData, this.userId!).subscribe({
      next: (recapId) => {
        console.log('✅ Recap created:', recapId);
        // Passer les données en passant par la route
        this.router.navigate(['/food', this.userId, recapId], {
          state: { measureData } // Passer les données
        });
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }

  get getErrorLabel() {
    if (this.measureForm.errors?.['required']) return 'Les champs sont obligatoires';
    return 'Formulaire invalide';
  }
}
