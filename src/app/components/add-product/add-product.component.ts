import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../models';
import { NgForm } from '@angular/forms';
import { CategoryService, CurrentUserService, LearnService, NotificationService, ProductService } from '../../utils';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private _productService: ProductService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddProductComponent>,
    private _notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryService: CategoryService,
    private _currentUserService: CurrentUserService,
    private _learnService:LearnService
  ) {}
  _model: Product = new Product();
  _productRenew: boolean = false;
  _action: Function;
  disableButton: boolean = false;
  predictData=0;

  categories:any;
  async ngOnInit() {
    this.categories=<any> await this._categoryService.listAsync();
    if (this.data?.Id != null) {
      try {
        this._model = this.data;
      } catch (error) {
        this._productService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._productRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(productForm: NgForm) {
    if (productForm.valid) {
      if ((await this._action(productForm))) this._notificationService.success('Product registration completed');
      this.dialogRef.close(this._productRenew);
    } else {
      this._notificationService.danger('Please fill in the required fields')
  }
}
  async insertActionAsync(productForm: NgForm) {
    try {
      this.disableButton = true;
      await this._productService.insertAsync( Object.assign(productForm.value,{CompanyID:this._currentUserService.value?.result.Id}));
      productForm.resetForm();
      this._productRenew = true;
      return true;
    } catch (error) {
      this.disableButton = false;
      this._productService.errorNotification(error);
      return false;
    }
  }
  async updateActionAsync(productForm: NgForm) {
    try {
      await this._productService.updateAsync(
        Object.assign(productForm.value, {
          Id: this.data.Id,
        })
      );
      return true;
    } catch (error) {
      this._productService.errorNotification(error);
      return false;
    }
  }
  async getPredict(){
    this.predictData=<number>await this._learnService.listAsync()
    this.predictData=Math.floor(this.predictData)
    console.log(this.predictData)
  }
}
