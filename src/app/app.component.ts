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
      birthday: employee?.birthday,
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
          console.table(this.employees);
        });
        break;
      case 'edit':
        let dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe({
          next: () => {
            this.getEmployees();
          },
          complete: () => {
            console.table(this.employees);
          },
        });
        break;
      case 'delete':
        let delDialogRef = this.dialog.open(
          DeleteDialogComponent,
          dialogConfig
        );
        delDialogRef.afterClosed().subscribe(() => {
          this.getEmployees();
          console.table(this.employees);
        });
        break;
      default:
        console.log('No dialog pop-up for this button');
    }
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
