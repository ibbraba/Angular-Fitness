import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import {CalculationResult, MeasureData, RecapCalculationService} from "../shared/services/recap-calculation.service";
import { FitnessService } from '../shared/services/fitness.service';

@Component({
  selector: 'app-recap',
  standalone: false,
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']

})
export class RecapComponent implements OnInit {
  measureData: MeasureData | null = null;
  recap: any;

  result: CalculationResult | null = null;
  loading: boolean = false;

  userId: string | null = null;
  recapId: number | null = null;

  Math = Math;

  constructor(
    private recapCalculationService: RecapCalculationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fitnessService: FitnessService
  ) {}

  ngOnInit() {
    this.recapId = this.route.snapshot.params['recapId'];
    this.userId = this.route.snapshot.params['userId'];

    console.log("UserId in recap component :", this.userId);
    console.log("RecapId in recap component :", this.recapId);

    this.loading = true;
    this.fitnessService.getRecap(this.userId!, this.recapId!).subscribe(recap => {
      this.recap = recap;
      this.processData();
      this.loading = false;
    });
  }

  processData() {
    if (!this.recap) return;

    // Convertir les données du backend au format attendu
    const gender = this.recap.mesures.Sexe === 'Homme' ? 'male' : 'female';

    this.measureData = {
      gender: gender,
      age: this.recap.mesures.Age,
      taille: this.recap.mesures.Taille,
      poids: this.recap.mesures.Poids,
      goalWeight: this.recap.mesures.PoidsCible,
      timelineWeeks: this.recap.mesures.DureeSemaines
    };

    // Convertir les aliments au format attendu
    const foodData = this.recap.repas?.map((food: any) => ({
      foodname: food.foodname,
      proteins: food.proteins,
      glucides: food.glucides,
      lipides: food.lipides
    })) || [];

    // Convertir les exercices au format attendu
    const exerciseData = this.recap.exercices?.map((ex: any) => ({
      exercisename: ex.Nom,
      exercisegroup: ex.Groupe,
      type: ex.Type
    })) || [];

    // Calculer les résultats
    this.calculate(foodData, exerciseData);
  }

  calculate(foodData: any[], exerciseData: any[]) {
    if (!this.measureData) {
      console.error('Données de mesure manquantes');
      return;
    }

    this.result = this.recapCalculationService.calculateFull(
      this.measureData,
      foodData,
      exerciseData
    );

    console.log('Résultats calculés:', this.result);
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

  getNetCalorieMessage(): string {
    if (!this.result) return '';
    if (this.result.netCalories < -500) return `Excédent: ${Math.abs(this.result.netCalories)} cal`;
    if (this.result.netCalories > 500) return `Déficit: ${this.result.netCalories} cal`;
    return 'Équilibre optimal';
  }

  goBack() {
    this.router.navigate(['/exercise', this.userId, this.recapId]);
  }

  saveAndFinish() {
    console.log('✅ Récapitulatif enregistré avec succès');
    this.router.navigate(['/dashboard']);
  }
}
