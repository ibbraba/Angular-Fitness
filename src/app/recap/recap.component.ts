import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import {CalculationResult, MeasureData, RecapCalculationService} from "../shared/services/recap-calculation.service";
import { FitnessService } from '../shared/services/fitness.service';

@Component({
  selector: 'app-recap',
  standalone: false,
  templateUrl: './recap.component.html',
 })
export class RecapComponent implements OnInit {
  measureData: MeasureData | null = null;
  foods: [] = [];
  exercises: [] = [];
  recap: any;

  result: CalculationResult | null = null;
  loading: boolean = false;

  userId: string | null = null;
  recapId: number | null = null;
  showResults: boolean = false;
  exerciseData: [] = [];
  foodData: [] = [];

  Math = Math;

  constructor(
    private recapCalculationService: RecapCalculationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fitnessService: FitnessService
  ) {
    // Récupérer les données passées via navigation state
    const navigation = this.router.getCurrentNavigation();
   
   /* if (navigation?.extras.state) {
      this.measureData = navigation.extras.state['measureData'];
      this.foods = navigation.extras.state['foods'] || [];
      this.exercises = navigation.extras.state['exercises'] || [];
    }
      */
  }

  ngOnInit() {
    this.recapId = this.route.snapshot.params['recapId'];
    this.userId = this.route.snapshot.params['userId'];
    
    console.log("UserId in recap component :", this.userId);
    console.log("RecapId in recap component :", this.recapId);
     this.fitnessService.getRecap(this.userId!, this.recapId!).subscribe(recap => { 
      this.recap = recap;
    });
  }

  calculate() {
    if (!this.measureData) {
      console.error('Données de mesure manquantes');
      this.loading = false;
      return;
    }

    this.result = this.recapCalculationService.calculateFull(
      this.measureData,
      this.foods,
      this.exercises
    );

    this.loading = false;
  }

  getCalorieStatus(): string {
    if (!this.result) return '';
    const diff = this.result.tdee - this.result.totalCaloriesConsumed;
    if (Math.abs(diff) < 50) return 'optimal';
    if (diff > 0) return 'deficit';
    return 'surplus';
  }

  getCalorieMessage(): string {
    if (!this.result) return '';
    const diff = this.result.tdee - this.result.totalCaloriesConsumed;
    if (Math.abs(diff) < 50) return 'Consommation optimale';
    if (diff > 0) return `Déficit: ${Math.abs(diff)} cal`;
    return `Excédent: ${Math.abs(diff)} cal`;
  }

  getNetCalorieStatus(): string {
    if (!this.result) return '';
    if (this.result.netCalories < -500) return 'surplus';
    if (this.result.netCalories > 500) return 'deficit';
    return 'optimal';
  }

  goBack() {
    this.router.navigate(['/exercise', this.userId, this.recapId]);
  }

  saveAndFinish() {
    console.log('✅ Récapitulatif enregistré avec succès');
    this.router.navigate(['/dashboard']);
  }
}
