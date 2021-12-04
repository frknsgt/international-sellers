import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models';
import { CategoryService } from '../../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogWindowComponent,
  AddCategoryComponent,
} from '../../../components';
import { CompanyService } from 'src/app/utils/services/company/company.service';
import { AddCompanyComponent } from 'src/app/components/add-company/add-company.component';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog,
    private _companyService: CompanyService
  ) {}
  searchText: string;
  companies: any[];
  paginationConfig = {
    id: 'company',
    itemsPerPage: 5,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.companies = <Array<any>>(
        await this._companyService.listAsync()
      );
    } catch (error) {
      this._companyService.errorNotification(error);
    }
  }

  openAddCompany(Id = null) {
    const diologRef = this._dialog.open(AddCompanyComponent, {
      width: '400px',
      data:
        Id == null
          ? null
          : this.companies.find((category) => category.Id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async companyDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the company ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._companyService.deleteAsync({ Id });
          this.companies.splice(
            this.companies.findIndex((category) => category.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Company information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));
          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._companyService.errorNotification(error);
        }
      }
    });
  }
}
