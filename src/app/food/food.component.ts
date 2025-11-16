import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FitnessService } from '../shared/services/fitness.service';
import { AuthService } from '../auth/auth.service';
import {FoodData, MeasureData} from "../measure/measure.component";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  standalone: false,
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  foodForm!: FormGroup;
  userId: string | null = null;
  recapId: number | null = null;

  // Données transmises entre composants
  measureData: MeasureData | null = null;
  foods: FoodData[] = [];

  constructor(
    private fb: FormBuilder,
    private fitnessService: FitnessService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Récupérer les données passées via la navigation
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.measureData = navigation.extras.state.measureData;
    }
  }

  ngOnInit(): void {
    this.foodForm = this.fb.group({
      foodname: new FormControl('', Validators.required),
      proteins: new FormControl('', [Validators.required, Validators.min(0)]),
      glucides: new FormControl('', [Validators.required, Validators.min(0)]),
      lipides: new FormControl('', [Validators.required, Validators.min(0)])
    });

    this.userId = this.authService.getSavedUser();
    this.route.params.subscribe(params => {
      this.recapId = params['recapId'];
    });
  }

  // Recevoir les données depuis FoodFormComponent via @Output
  onFoodAdded(food: FoodData) {
    this.foods.push(food);
    this.fitnessService.addFood(food, this.userId!, this.recapId!);
  }

  // Recevoir l'événement de suppression depuis FoodListComponent via @Output
  onFoodRemoved(index: number) {
    this.foods.splice(index, 1);
  }

  goToNextStep() {
    // Passer les données au composant suivant
    this.router.navigate(['/exercise', this.userId, this.recapId], {
      state: {
        measureData: this.measureData,
        foods: this.foods
      }
    });
  }

  get getErrorLabel() {
    if (this.foodForm.errors?.['required']) return 'Les champs sont obligatoires';
    return 'Formulaire invalide';
  }
}
