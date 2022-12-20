import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MaterialExampleModule } from 'src/material.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { MatDatePickerComponent } from './pages/mat-date-picker/mat.date.picker';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/mat-date-picker', component: MatDatePickerComponent },
];

@NgModule({
  declarations: [HomeComponent, MatDatePickerComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [MatDatePickerComponent],
})
export class HomeModule {}
