import { Component, OnInit } from '@angular/core';
import { Category, Roles } from '../../../models';
import { AuthService, CategoryService } from '../../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogWindowComponent,
  AddCategoryComponent,
} from '../../../components';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  constructor(
    private _categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog,
    private _authService: AuthService
  ) {}
  searchText: string;
  categories: Category[];
  paginationConfig = {
    id: 'categories',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.categories = <Array<Category>>(
        await this._categoryService.listAsync()
      );
    } catch (error) {
      this._categoryService.errorNotification(error);
    }
  }

  openAddCategory(Id = null) {
    const diologRef = this._dialog.open(AddCategoryComponent, {
      width: '400px',
      data:
        Id == null
          ? null
          : this.categories.find((category) => category.Id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async categoryDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the category ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._categoryService.deleteAsync({ Id });
          this.categories.splice(
            this.categories.findIndex((category) => category.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Category information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));
          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._categoryService.errorNotification(error);
        }
      }
    });
  }
  async changeCategoryState(Id, state) {
    try {
      state = state ? 0 : 1;
      await this._categoryService.updateAsync({ Id: Id, PublicState: state });
      let notificationMessage: string;
      this._translateService
        .get('Category status successfully updated.')
        .subscribe((value) => (notificationMessage = value));
      this._snackBar.open(notificationMessage, 'X', {
        duration: 3000,
        panelClass: 'notification__success',
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
      });
    } catch (error) {
      this._categoryService.errorNotification(error);
    }
  }
}
