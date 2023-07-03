import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [CommonModule, MatIconModule, BreadcrumbModule],
  exports: [BreadcrumbsComponent],
})
export class BreadcrumbsModule {}
