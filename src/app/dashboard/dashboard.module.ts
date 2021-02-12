import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";

import { DashboardComponent } from "./dashboard.component";


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [],
  declarations: [
    DashboardComponent
  ],
  providers: [],
})
export class DashboardModule { }
