import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent {
   @Input() title: string = '';
  @Input() value: number = 0;
  @Input() icon: string = '';
  @Input() count: number = 0;

}
