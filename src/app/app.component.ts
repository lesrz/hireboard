import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public openDialog(dialogType: string): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    switch (dialogType) {
      case 'add':
        this.dialog.open(AddDialogComponent, dialogConfig);
        break;
      case 'edit':
        this.dialog.open(EditDialogComponent, dialogConfig);
        break;
      case 'delete':
        this.dialog.open(DeleteDialogComponent, dialogConfig);
        break;
      default:
        console.log('No dialog pop-up for this button');
    }
  }
}
