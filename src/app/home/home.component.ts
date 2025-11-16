import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HomeHistoryService } from '../shared/home-history.service';
import { AuthService } from '../auth/auth.service';
import { FitnessService } from '../shared/services/fitness.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: false,
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private homeHistoryService: HomeHistoryService, private authService: AuthService, private fitnessService: FitnessService) { }


  connectedUser: any = null; // Replace 'any' with your User type
  recapsHistory: any[] = [];
  showDialog: boolean = false;
  selectedRecap: any = null;



ngOnInit(): void {

  // Call this to trigger user retrieval if saved
  const isConnected = this.authService.isUserConnected();

  if (this.authService.user) {
    // User was already in memory
    this.connectedUser = this.authService.user;
    this.loadRecap();
  } else if (isConnected) {
    // User is being restored via HTTP → wait for it
    this.authService.getSavedUserInfo().subscribe(users => {
      this.connectedUser = users[0];
      this.authService.user = this.connectedUser; // store it back
      this.loadRecap();
    });
  }

}

loadRecap() {
  if (!this.connectedUser) return;
  
  this.homeHistoryService.getUserRecapHistory(this.connectedUser.id).subscribe(recaps => {
    this.recapsHistory = recaps;
    console.log("Recaps loaded:", this.recapsHistory);
  });
}



  navigateToFitness() {
    this.router.navigate(['/measure']);
  }


  calculateCalories(proteins: number, glucides: number, lipides: number): number {
    return this.fitnessService.calculateCalories(proteins, glucides, lipides);
  }

  calculateIMC(weight: number, height: number): number {
    return this.fitnessService.calculateIMC(weight, height);
  }


  openDetails(recap: any) {
    this.selectedRecap = recap;
    this.showDialog = true;
  }

  closeDetails() {
    this.showDialog = false;
    this.selectedRecap = null;
  }
}
