import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../utils';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _categoryService: CategoryService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  _model: Category = new Category();
  _categoryRenew: boolean = false;
  _action: Function;
  disableButton: boolean = false;
  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this._model = this.data;
      } catch (error) {
        this._categoryService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._categoryRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(categoryForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };
    if (categoryForm.valid) {
      this._translateService
        .get('Category registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(categoryForm))) return;
      this.dialogRef.close(this._categoryRenew);
    } else {
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__error';
    }
    this._snackBar.open(notification.message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: notification.panelClass,
    });
  }
  async insertActionAsync(categoryForm: NgForm) {
    try {
      this.disableButton = true;
      await this._categoryService.insertAsync(categoryForm.value);
      categoryForm.resetForm();
      this._categoryRenew = true;
      return true;
    } catch (error) {
      this.disableButton = false;
      this._categoryService.errorNotification(error);
      return false;
    }
  }
  async updateActionAsync(categoryForm: NgForm) {
    try {
      await this._categoryService.updateAsync(
        Object.assign(categoryForm.value, {
          Id: this.data.Id,
        })
      );
      return true;
    } catch (error) {
      this._categoryService.errorNotification(error);
      return false;
    }
  }
}
