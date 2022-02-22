import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddDialogComponent } from './components/shared/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './components/shared/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './components/shared/edit-dialog/edit-dialog.component';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  opened = false;
  public employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public openDialog(employee: Employee | null, dialogType: string): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      id: employee?.id,
      name: employee?.name,
      email: employee?.email,
      jobTitle: employee?.jobTitle,
      phone: employee?.phone,
      imgUrl: employee?.imgUrl,
      code: employee?.employeeCode,
    };

    switch (dialogType) {
      case 'add':
        document.getElementById('add-employee-form')?.click();
        dialogConfig.data = {
          name: employee?.name,
          email: employee?.email,
          jobTitle: employee?.jobTitle,
          phone: employee?.phone,
          imgUrl: employee?.imgUrl,
        };
        let addDialogRef = this.dialog.open(AddDialogComponent, dialogConfig);
        addDialogRef.afterClosed().subscribe(() => {
          this.getEmployees();
        });
        break;
      case 'edit':
        let dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
          this.getEmployees();
        });
        break;
      case 'delete':
        let delDialogRef = this.dialog.open(
          DeleteDialogComponent,
          dialogConfig
        );
        delDialogRef.afterClosed().subscribe(() => {
          this.getEmployees();
        });
        break;
      default:
        console.log('No dialog pop-up for this button');
    }
  }
}
