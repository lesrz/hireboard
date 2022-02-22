import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';
import { DialogData } from '../dialog-data';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  public deleteEmployee!: Employee;
  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (response: void) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      complete: () => {
        this.dialogRef.close();
      },
    });
  }
}
