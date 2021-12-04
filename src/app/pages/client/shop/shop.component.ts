import { Component, OnInit,Output } from '@angular/core';
import { Product } from 'src/app/models';
import { CategoryService } from 'src/app/utils/services/category/category.service';
import { ProductService } from 'src/app/utils/services/product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService
  ) { }
  
  product:any;
  categories:any;
  tempProduct:any;
  async ngOnInit() {
    this.product=<Array<Product>> await this._productService.listAsync();
    this.categories=<Array<any>> await this._categoryService.listAsync();
    console.log(this.categories)
    this.tempProduct=this.product
  }

  filterData(Id?){
    this.product=this.tempProduct
    if(Id)
    this.product=this.product.filter(data=>data.CategoryID==Id)
  }

}
