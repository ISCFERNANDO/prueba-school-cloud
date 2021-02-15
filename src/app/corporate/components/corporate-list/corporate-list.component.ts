import { FormBuilder, FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import swal from "sweetalert2";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CorporateService } from "../../services/corporate.service";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { Corporate } from "app/corporate/models/corporate";
import { NgxSpinnerService } from "ngx-spinner";
import LIST_STATUS from "./../../data/status.json";
import { debounceTime } from "rxjs/operators";

interface SelectItem {
  name: string;
  value: number;
}
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
  status: any;
  filtersForm: FormGroup;
  filtro: FormControl = new FormControl("");
  numItems: FormControl = new FormControl(10);
  listaCreadores: SelectItem[] = [];
  listaAsignados: SelectItem[] = [];
  maxItems = [
    { value: 10, name: "10" },
    { value: 25, name: "25" },
    { value: 50, name: "50" },
    { value: 100, name: "100" },
  ];
  constructor(
    private corporateService: CorporateService,
    private spinner: NgxSpinnerService,
    private fBuilder: FormBuilder
  ) {
    this.status = LIST_STATUS;
  }

  ngOnInit(): void {
    this.buildFiltersForm();
    this.addFiltersHandler();
    this.spinner.show();
    this.getListOfCorporate(true);
  }

  private buildFiltersForm() {
    this.filtersForm = this.fBuilder.group({
      status: [-1],
      createdBy: [-1],
      assignedBy: [-1],
    });
  }

  private addFiltersHandler() {
    this.filtersForm.valueChanges.subscribe((formData) => {
      this.appliedFilters(formData);
    });
    this.filtro.valueChanges.pipe(debounceTime(250)).subscribe(() => {
      const formData = this.filtersForm.getRawValue();
      this.appliedFilters(formData);
    });
    this.numItems.valueChanges.subscribe((numItems) => {
      console.log("numItems data ==> ", numItems);
      this.limitRef = numItems;
    });
  }

  private async appliedFilters(formData: any) {
    await this.getListOfCorporate();
    const tempData = this.rows;
    const statusId = +formData.status;
    const createdById = +formData.createdBy;
    const assignedById = +formData.assignedBy;
    const strFilter = this.filtro.value.toString().toLowerCase();
    this.rows = tempData.filter(
      (item) =>
        this.filterByStatus(item, statusId) &&
        this.filterByUserCreated(item, createdById) &&
        this.filterByUserAssigned(item, assignedById) &&
        this.filterByCorporateName(item, strFilter)
    );
    this.table.offset = 0;
  }

  private filterByStatus = (item: Corporate, statusId: number) =>
    item.S_Activo === statusId || statusId === -1;

  private filterByUserCreated = (item: Corporate, createdById: number) =>
    item.user_created.id === createdById || createdById === -1;

  private filterByUserAssigned = (item: Corporate, assignedById: number) =>
    item.asignado.id === assignedById || assignedById === -1;

  private filterByCorporateName(item: Corporate, corporateName: string) {
    return (
      !corporateName ||
      item.S_NombreCompleto.toLowerCase().includes(corporateName)
    );
  }

  private async getListOfCorporate(fillSelectUser: boolean = false) {
    try {
      const response = await this.corporateService
        .getListOfCorporate()
        .toPromise();
      if (response.data) {
        this.rows = response.data;
        this.table.offset = 0;
        if (fillSelectUser) {
          this.createCreatorsAndAssignessList();
        }
      }
    } catch (error) {
      this.showError();
    } finally {
      this.spinner.hide();
    }
  }

  private createCreatorsAndAssignessList() {
    const creadoresEntries = new Map<number, string>();
    const asignadosEntries = new Map<number, string>();
    this.rows.forEach((item) => {
      creadoresEntries.set(
        item.user_created.id,
        `${item.user_created.S_Nombre} ${item.user_created.S_Apellidos}`
      );
      asignadosEntries.set(
        item.asignado.id,
        `${item.asignado.S_Nombre} ${item.asignado.S_Apellidos}`
      );
    });

    this.listaCreadores = this.mapToArray(creadoresEntries);
    this.listaAsignados = this.mapToArray(asignadosEntries);
    const itemTodos = { value: -1, name: "Todos" };
    this.listaCreadores.unshift(itemTodos);
    this.listaAsignados.unshift(itemTodos);
  }

  private mapToArray(map: Map<number, string>) {
    const list = [];
    map.forEach((value, key) => {
      list.push({
        value: key,
        name: value,
      });
    });
    return list;
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
