import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CorporateRoutingModule } from "./corporate-routing.module";
import { CorporateListComponent } from "./components/corporate-list/corporate-list.component";
import { CorporateDetailComponent } from "./components/corporate-detail/corporate-detail.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
  declarations: [
    CorporateListComponent,
    CorporateDetailComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    CorporateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbModule,
  ],
})
export class CorporateModule {}
