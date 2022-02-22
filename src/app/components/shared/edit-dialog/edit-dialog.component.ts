import { Component, OnInit, Inject, Input, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/employee';
import { HttpErrorResponse } from '@angular/common/http';
export interface DialogData {
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  phone: string;
  imgUrl: string;
  code: string;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  @Input() editEmployee!: Employee;
  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onEditEmployee(employee: Employee): void {
    this.employeeService.updateEmployees(employee).subscribe({
      next: (response: Employee) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
