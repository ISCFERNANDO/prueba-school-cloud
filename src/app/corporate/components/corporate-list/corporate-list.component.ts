import swal from "sweetalert2";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CorporateService } from "../../services/corporate.service";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { Corporate } from "app/corporate/models/corporate";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-corporate-list",
  templateUrl: "./corporate-list.component.html",
  styleUrls: ["./corporate-list.component.scss"],
})
export class CorporateListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  columns = [
    {
      name: "CORPORATIVO",
    },
    {
      name: "URL",
    },
    {
      name: "ENCORPORACIÓN",
    },
    {
      name: "CREADO EL",
    },
    {
      name: "ASIGNADO A",
    },
    {
      name: "STATUS",
    },
    {
      name: "ACCIONES",
    },
  ];
  ColumnMode = ColumnMode;
  limitRef = 10;
  rows: Corporate[] = [];
  constructor(
    private corporateService: CorporateService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.corporateService.getListOfCorporate().subscribe(
      (response) => {
        if (response.data) {
          this.rows = response.data;
        }
        this.table.offset = 0;
        this.spinner.hide();
        console.log(this.rows);
      },
      () => {
        this.spinner.hide();
        this.showError();
      }
    );
  }

  private showError() {
    swal.fire({
      title: "¡Error!",
      text: "No se pudo obtener la lista de corporativos",
      icon: "error",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });
  }
}
