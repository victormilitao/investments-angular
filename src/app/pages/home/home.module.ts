import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsImporterComponent } from './home-component/assets-importer/assets-importer.component';
import { HomeComponent } from './home-component/home.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [HomeComponent, AssetsImporterComponent],
})
export class HomeModule { }
