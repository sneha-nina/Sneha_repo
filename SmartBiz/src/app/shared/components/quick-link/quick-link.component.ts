import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-quick-link',
  templateUrl: './quick-link.component.html',
  styleUrls: ['./quick-link.component.scss']
})
export class QuickLinkComponent {
  constructor(public authService: AuthService) {}
}
