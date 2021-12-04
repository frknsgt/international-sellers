import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/utils/services/product/product.service';
import { Product } from 'src/app/models';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnInit {

  constructor(
    private _productservice: ProductService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  product:Product=new Product;
  Id = this._activatedRoute.snapshot.paramMap.get('Id');

  async ngOnInit() {
    this.product =<Product> await this._productservice.findAsync(this.Id);
    console.log(this.product)

  }

}
