import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FitnessService } from '../shared/services/fitness.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent {

  exerciseForm!: FormGroup;
  userId!: string;
  recapId!: number;
  
    constructor(
      private fb: FormBuilder,
      private fitnessService: FitnessService,
      private router: Router,
      private route : ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      this.exerciseForm = this.fb.group({
        exercisename: new FormControl('', [Validators.required, Validators.minLength(4)]),
        exercisegroup: new FormControl('', [Validators.required, Validators.min(4)]),
        type: new FormControl('', Validators.required),
      });

      this.userId = this.route.snapshot.params['userId'];
      this.recapId = this.route.snapshot.params['recapId'];
      console.log("UserId in exercise component :", this.userId);
      console.log("RecapId in exercise component :", this.recapId);
    }
  
    addExercise() {
      if (this.exerciseForm.invalid) return;
      this.fitnessService.addExercise({
        exercisename: this.exerciseForm.value.exercisename,
        exercisegroup: this.exerciseForm.value.exercisegroup,
        type: this.exerciseForm.value.type
      }, this.userId, this.recapId);
      console.log('exercise ajoutée avec succès !');
      // this.router.navigate(['/login']);
    }
  
    get getErrorLabel() {
      if (this.exerciseForm.errors?.['required']) return 'Les champs sont obligatoires';
      // if (!!this.exerciseForm.controls?.['password']?.errors?.['minlength']) return `La longueur minimal pour votre mot de passe est ${this.exerciseForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
      // if (this.exerciseForm.errors?.['missMatch']) return 'Les mots de passe ne correspondent pas';
      return 'Formulaire invalide';
    }

    goToNextStep() {
      this.router.navigate(['/recap', this.userId, this.recapId]);
    }
  

}
