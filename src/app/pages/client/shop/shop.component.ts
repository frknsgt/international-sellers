import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductService } from 'src/app/utils/services/product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  

  constructor(
    private _productService: ProductService
  ) { }
  
  product:any;
  async ngOnInit() {
    this.product=<Array<Product>> await this._productService.listAsync();
  }

}
