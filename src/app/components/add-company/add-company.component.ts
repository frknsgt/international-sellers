import { Component, OnInit, Inject } from '@angular/core';
import { Company } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from '../../utils';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _companyService: CompanyService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  _model: Company = new Company();
  _companyRenew: boolean = false;
  _action: Function;
  disableButton: boolean = false;
  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this._model = this.data;
      } catch (error) {
        this._companyService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._companyRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(companyForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };
    if (companyForm.valid) {
      this._translateService
        .get('Company registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(companyForm))) return;
      this.dialogRef.close(this._companyRenew);
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
  async insertActionAsync(companyForm: NgForm) {
    try {
      this.disableButton = true;
      await this._companyService.insertAsync(companyForm.value);
      companyForm.resetForm();
      this._companyRenew = true;
      return true;
    } catch (error) {
      this.disableButton = false;
      this._companyService.errorNotification(error);
      return false;
    }
  }
  async updateActionAsync(companyForm: NgForm) {
    try {
      await this._companyService.updateAsync(
        Object.assign(companyForm.value, {
          Id: this.data.Id,
        })
      );
      return true;
    } catch (error) {
      this._companyService.errorNotification(error);
      return false;
    }
  }
}
