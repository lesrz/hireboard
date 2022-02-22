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
  @Input() workedEmployee!: Employee;

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

  public openDialog(employee: Employee, dialogType: string): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    switch (dialogType) {
      case 'add':
        this.dialog.open(AddDialogComponent, dialogConfig);
        break;
      case 'edit':
        this.workedEmployee = employee;
        dialogConfig.data = {
          id: this.workedEmployee.id,
          name: this.workedEmployee.name,
          email: this.workedEmployee.email,
          jobTitle: this.workedEmployee.jobTitle,
          phone: this.workedEmployee.phone,
          imgUrl: this.workedEmployee.imgUrl,
          code: this.workedEmployee.employeeCode,
        };
        let dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
          this.getEmployees();
        });
        break;
      case 'delete':
        this.dialog.open(DeleteDialogComponent, dialogConfig);
        break;
      default:
        console.log('No dialog pop-up for this button');
    }
  }
}
