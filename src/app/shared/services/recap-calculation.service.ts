import { Injectable } from '@angular/core';

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

export interface CalculationResult {
  bmr: number;
  tdee: number;
  imc: number;
  imcCategory: string;
  imcColor: string;
  idealWeight: number;
  totalCaloriesConsumed: number;
  totalProteins: number;
  totalGlucides: number;
  totalLipides: number;
  estimatedCaloriesBurned: number;
  netCalories: number;
  deficitToGoal: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecapCalculationService {

  calculateBMR(age: number, weight: number, height: number, gender: 'male' | 'female'): number {
    // Formule de Harris-Benedict
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  }

  calculateTDEE(bmr: number, activityLevel: number = 1.55): number {
    return bmr * activityLevel;
  }

  calculateIMC(weight: number, height: number): number {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  }

  calculateIdealWeight(height: number, gender: 'male' | 'female'): number {
    // Formule de Devine
    const heightInInches = height / 2.54;
    if (gender === 'male') {
      return 50 + (2.3 * (heightInInches - 60));
    } else {
      return 45.5 + (2.3 * (heightInInches - 60));
    }
  }

  getIMCCategory(imc: number): string {
    if (imc < 18.5) return 'Insuffisant';
    if (imc < 25) return 'Normal';
    if (imc < 30) return 'Surpoids';
    return 'Obésité';
  }

  getIMCColor(imc: number): string {
    if (imc < 18.5) return '#3498db';
    if (imc < 25) return '#2ecc71';
    if (imc < 30) return '#f39c12';
    return '#e74c3c';
  }

  calculateFoodCalories(foods: FoodData[]): {
    totalCalories: number;
    proteins: number;
    glucides: number;
    lipides: number;
  } {
    let totalCalories = 0;
    let totalProteins = 0;
    let totalGlucides = 0;
    let totalLipides = 0;

    foods.forEach(food => {
      const foodCalories = (food.proteins * 4) + (food.glucides * 4) + (food.lipides * 9);
      totalCalories += foodCalories;
      totalProteins += food.proteins;
      totalGlucides += food.glucides;
      totalLipides += food.lipides;
    });

    return {
      totalCalories: Math.round(totalCalories),
      proteins: Math.round(totalProteins * 10) / 10,
      glucides: Math.round(totalGlucides * 10) / 10,
      lipides: Math.round(totalLipides * 10) / 10
    };
  }

  calculateExerciseCaloriesBurned(exercises: ExerciseData[], weight: number, duration: number = 30): number {
    const met: { [key: string]: number } = {
      'cardio': 8,
      'musculation': 6,
      'yoga': 3,
      'stretching': 2.5,
      'hiit': 10,
      'running': 9,
      'walking': 3.5,
      'cycling': 7
    };

    let totalCalories = 0;
    exercises.forEach(exercise => {
      const exerciseMET = met[exercise.type?.toLowerCase()] || 4;
      totalCalories += exerciseMET * weight * (duration / 60);
    });

    return Math.round(totalCalories);
  }

  calculateFull(
    measureData: MeasureData,
    foodData: FoodData[],
    exerciseData: ExerciseData[]
  ): CalculationResult {
    const bmr = this.calculateBMR(
      measureData.age,
      measureData.poids,
      measureData.taille,
      measureData.gender
    );
    const tdee = this.calculateTDEE(bmr, 1.55);
    const imc = this.calculateIMC(measureData.poids, measureData.taille);
    const idealWeight = this.calculateIdealWeight(measureData.taille, measureData.gender);

    const foodCalories = this.calculateFoodCalories(foodData);
    const caloriesBurned = this.calculateExerciseCaloriesBurned(exerciseData, measureData.poids);
    const netCalories = foodCalories.totalCalories - caloriesBurned;

    let deficitToGoal = 0;
    if (measureData.goalWeight && measureData.timelineWeeks) {
      const weightDifference = measureData.poids - measureData.goalWeight;
      deficitToGoal = (weightDifference * 7700) / measureData.timelineWeeks;
    }

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      imc: Math.round(imc * 10) / 10,
      imcCategory: this.getIMCCategory(imc),
      imcColor: this.getIMCColor(imc),
      idealWeight: Math.round(idealWeight * 10) / 10,
      totalCaloriesConsumed: foodCalories.totalCalories,
      totalProteins: foodCalories.proteins,
      totalGlucides: foodCalories.glucides,
      totalLipides: foodCalories.lipides,
      estimatedCaloriesBurned: caloriesBurned,
      netCalories: Math.round(netCalories),
      deficitToGoal: Math.round(deficitToGoal)
    };
  }
}
