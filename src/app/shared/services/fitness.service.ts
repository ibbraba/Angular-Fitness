import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {

  constructor(private http: HttpClient) { }

  addExercise(exercise: { exercisename: string; exercisegroup: string; type: string }) {
    this.http.post('http://localhost:3000/exercises', exercise).subscribe();
  }

  addFood(food: { foodname: string; proteins: number; glucides: number; lipides: number }) {
    this.http.post('http://localhost:3000/foods', food).subscribe();
  }

  addMeasure(measure: { age: number; taille: number; poids: number }) {
    this.http.post('http://localhost:3000/measures', measure).subscribe();
  }
}
