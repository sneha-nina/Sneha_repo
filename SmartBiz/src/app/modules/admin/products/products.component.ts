import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Product } from 'src/app/shared/models/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
   products: Product[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProducts().subscribe((data: Product[]) => this.products = data);
  }

}
