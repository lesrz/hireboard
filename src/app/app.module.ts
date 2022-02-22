import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { EditDialogComponent } from './components/shared/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './components/shared/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './components/shared/delete-dialog/delete-dialog.component';
import { EmployeeService } from './employee.service';

@NgModule({
  declarations: [
    AppComponent,
    EditDialogComponent,
    AddDialogComponent,
    DeleteDialogComponent,
  ],
  entryComponents: [EditDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
