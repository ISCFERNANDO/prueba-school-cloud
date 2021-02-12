import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CorporateListComponent } from "./components/corporate-list/corporate-list.component";
import { CorporateDetailComponent } from "./components/corporate-detail/corporate-detail.component";

const routes: Routes = [
  {
    path: "",
    component: CorporateListComponent,
    data: {
      title: "Corporativos",
    },
  },
  {
    path: "detalle/:id",
    component: CorporateDetailComponent,
    data: {
      title: "Detalle de corporativo",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporateRoutingModule {}
