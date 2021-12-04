import { Component, OnInit,Input } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductService } from 'src/app/utils/services/product/product.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {

  constructor(
    private _productService: ProductService
  ) { }
  @Input() item!:any; 
  product: Product = new Product;
  async ngOnInit() {
  }

}
