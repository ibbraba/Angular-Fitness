import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FitnessService } from '../shared/services/fitness.service';

@Component({
  selector: 'app-home-history',
  templateUrl: './home-history.component.html',
  styleUrls: ['./home-history.component.scss']
})
export class HomeHistoryComponent {
  @Input() show: boolean = false;
  @Input() recap: any = null;   // ← receive recap object

  @Output() cancel = new EventEmitter<void>();
  
  constructor(public fitnessService: FitnessService) {}

  close() {
    this.cancel.emit();
  }
}
