import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FitnessService } from '../shared/services/fitness.service';
import { AuthService } from '../auth/auth.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {


  recapId: number | null = null;

  foodForm!: FormGroup;
  userId:  string | null = null;
  constructor(
    private fb: FormBuilder,
    private fitnessService: FitnessService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { 


  }

  ngOnInit(): void {
    this.foodForm = this.fb.group({
      foodname: new FormControl('', Validators.required),
      proteins: new FormControl('', [Validators.required, Validators.min(4)]),
      glucides: new FormControl('', Validators.required),
      lipides: new FormControl('', Validators.required),
    });

    
    this.userId = this.authService.getSavedUser();
    this.route.params.subscribe(params => {
      this.recapId =  params['recapId'];
    });
    console.log("UserId in food component :", this.userId);
    console.log("RecapId in food component :", this.recapId);
    
  }

  addFood() {
    console.log("UserId", this.userId);
    if (this.foodForm.invalid) return;
    this.fitnessService.addFood({
      foodname: this.foodForm.value.foodname,
      proteins: this.foodForm.value.proteins,
      glucides: this.foodForm.value.glucides,
      lipides: this.foodForm.value.lipides
    }, this.userId!, this.recapId!);
    console.log('Nourriture ajoutée avec succès !');
    this.foodForm.reset();
    this.router.navigate(['/food', this.userId, this.recapId]);
  }

  goToNextStep() {
    this.router.navigate(['/exercise', this.userId, this.recapId]);
  }

  get getErrorLabel() {
    if (this.foodForm.errors?.['required']) return 'Les champs sont obligatoires';
    // if (!!this.foodForm.controls?.['password']?.errors?.['minlength']) return `La longueur minimal pour votre mot de passe est ${this.foodForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    // if (this.foodForm.errors?.['missMatch']) return 'Les mots de passe ne correspondent pas';
    return 'Formulaire invalide';
  }

}
