import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HomeHistoryService } from '../shared/home-history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private homeHistoryService: HomeHistoryService) { }

  connectedUser: any = null; // Replace 'any' with your User type
  recapsHistory: any[] = [];
  ngOnInit(): void {
     this.homeHistoryService.getUserRecapHistory(1).subscribe(recaps => {
      this.recapsHistory = recaps;
    console.log(this.recapsHistory);
  });
  }


  navigateToFitness () {
    this.router.navigate(['/measure']);
  }




}
