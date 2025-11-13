import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {

  constructor(private http: HttpClient) { }

  addExercise(exercise: { exercisename: string; exercisegroup: string; type: string }, userId: string, recapId: number) {
    const url = `http://localhost:3000/users/${userId}`;

  this.http.get<any>(url).subscribe(user => {
    if (!user) {
      console.error('User not found');
      return;
    }

    const recap = user.recaps.find((r: any) => r.id == recapId);
    if (!recap) {
      console.error('Recap not found');
      return;
    }

    // 🧩 Create the new exercise
    const newExercise = {
      id: Date.now(),
      Nom: exercise.exercisename,
      Groupe: exercise.exercisegroup,
      Type: exercise.type,
      Objectif: '' 
    };

    // ✅ Add to the recap
    recap.exercices.push(newExercise);

    // 💾 Save updated user to db.json
    this.http.put(url, user).subscribe(() => {
      console.log('✅ Exercise added successfully!');
    });
  });
  }

  addFood(food: { foodname: string; proteins: number; glucides: number; lipides: number }, userId: string, recapId: number) {
    const url = `http://localhost:3000/users/${userId}`;

    // 1️⃣ Get the user first
    this.http.get<any>(url).subscribe(user => {
      // 2️⃣ Find the recap we need
      console.log("User recaps :", user.recaps);
      
      const recap = user.recaps.find((r: any) => r.id == recapId);
      if (!recap) {
        console.error('Recap not found');
        return;
      }

      // 3️⃣ Add the new meal to the recap
      const newRepas = { id: Date.now(), ...food };
      recap.repas.push(newRepas);

      // 4️⃣ Send the updated user back to the db.json
      this.http.put(url, user).subscribe(() => {
        console.log('✅ Repas added successfully!');
      });
    });
  }

  addMeasure(measure: { gender: string; age: number; taille: number; poids: number }, userId: string): Observable<number> {
    const url = `http://localhost:3000/users/${userId}`;

    return new Observable<number>(observer => {
    this.http.get<any>(url).subscribe(user => {
      if (!user) {
        console.error('User not found');
        return;
      }

      // 🧩 Create a new recap object
      const newRecap = {
        id: Date.now(),
        mesures: {
          Sexe: measure.gender,
          Age: measure.age,
          Taille: measure.taille,
          Poids: measure.poids
        },
        exercices: [],
        repas: []
      };

      // 🧠 Add the new recap to the user
      if (!user.recaps) {
        user.recaps = [];
      }
      user.recaps.push(newRecap);

      // 💾 Save it back to db.json
      this.http.put(url, user).subscribe({
        next: () => {
          console.log('✅ Recap created with ID:', newRecap.id);
          observer.next(newRecap.id); // return the recap ID to the caller
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
    });
  }


  calculateCalories(proteins: number, glucides: number, lipides: number): number {
    return (proteins * 4) + (glucides * 4) + (lipides * 9);
  }

  calculateIMC(weight: number, height: number): number {
    const heightInMeters = height / 100;
    return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
  }
}
