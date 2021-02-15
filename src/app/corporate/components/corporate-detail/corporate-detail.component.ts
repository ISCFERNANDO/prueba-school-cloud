import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ContactoCorporativo, Corporate } from "app/corporate/models/corporate";
import { CorporateService } from "app/corporate/services/corporate.service";
import { NgxSpinnerService } from "ngx-spinner";
import swal from "sweetalert2";
import LIST_STATUS from "./../../data/status.json";

@Component({
  selector: "app-corporate-detail",
  templateUrl: "./corporate-detail.component.html",
  styleUrls: ["./corporate-detail.component.scss"],
})
export class CorporateDetailComponent implements OnInit {
  id: number;
  corporate: Corporate;
  formDatosGenerales: FormGroup;
  formDatosContacto: FormGroup;
  contactEditing: ContactoCorporativo = null;
  editingGeneralData: boolean = false;
  estatus = LIST_STATUS;
  constructor(
    private activatedRoute: ActivatedRoute,
    private corporateService: CorporateService,
    private spinner: NgxSpinnerService,
    private fBuilder: FormBuilder,
    private location: Location
  ) {
    this.id = +this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.buildFormDatosGenerales();
    this.buildFormDatosContacto();
    this.getDetailOfCorporate();
  }

  private buildFormDatosGenerales() {
    this.formDatosGenerales = this.fBuilder.group({
      nombreCorto: [{ value: "", disabled: true }],
      nombreCompleto: [{ value: "", disabled: true }],
      status: [{ value: "", disabled: true }],
      fechaIncorporacion: [
        { value: "", disabled: true },
        [Validators.required],
      ],
      urlSistema: [{ value: "", disabled: true }, [Validators.required]],
    });
  }

  private buildFormDatosContacto() {
    this.formDatosContacto = this.fBuilder.group({
      nombre: [""],
      puesto: [""],
      comentarios: [""],
      telefonoFijo: [""],
      telefonoMovil: [""],
      email: [""],
    });
  }

  private getDetailOfCorporate() {
    this.spinner.show();
    this.corporateService.getDetailOfCorporate(this.id).subscribe(
      (response) => {
        this.corporate = response.data.corporativo;
        this.setFormData();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.showError("No se pudo obtener el detalle del corporativo");
      }
    );
  }

  private setFormData() {
    this.formDatosGenerales.patchValue({
      nombreCorto: this.corporate.S_NombreCorto,
      nombreCompleto: this.corporate.S_NombreCompleto,
      status: this.corporate.S_Activo,
      fechaIncorporacion: this.corporate.D_FechaIncorporacion,
      urlSistema: this.corporate.S_SystemUrl,
    });
  }

  addContact() {
    this.spinner.show();
    let newContact: ContactoCorporativo = this.getContactFormData();
    this.corporateService.addContact(newContact).subscribe(
      (response: any) => {
        newContact = response.data;
        this.updateUI(newContact);
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.showError("No se pudo agregar el contacto");
      }
    );
  }

  editContact(id: number) {
    this.contactEditing = this.corporate.tw_contactos_corporativo.find(
      (contact) => contact.id === id
    );
    this.setDatosContactForm(this.contactEditing);
  }

  private setDatosContactForm(contact: ContactoCorporativo) {
    this.formDatosContacto.patchValue({
      nombre: contact.S_Nombre,
      puesto: contact.S_Puesto,
      comentarios: contact.S_Comentarios,
      telefonoFijo: contact.N_TelefonoFijo,
      telefonoMovil: contact.N_TelefonoMovil,
      email: contact.S_Email,
    });
  }

  updateContact() {
    this.spinner.show();
    this.contactEditing = this.getContactFormData();
    this.corporateService.updateContact(this.contactEditing).subscribe(
      (response) => {
        this.updateUI();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.showError("No se pudo actualizar el contacto");
      }
    );
  }

  private getContactFormData(): any {
    const formData = this.formDatosContacto.getRawValue();
    return {
      S_Nombre: formData.nombre,
      S_Puesto: formData.puesto,
      S_Comentarios: formData.comentarios,
      N_TelefonoFijo: formData.telefonoFijo,
      N_TelefonoMovil: formData.telefonoMovil,
      S_Email: formData.email,
      id: this.contactEditing?.id,
      tw_corporativo_id: this.corporate.id,
    };
  }

  private updateUI(newContact?: ContactoCorporativo) {
    if (newContact) {
      this.addContactToList(newContact);
    } else {
      this.updateListContact();
    }

    this.formDatosContacto.reset();
    this.contactEditing = null;
  }

  private addContactToList(newContact: ContactoCorporativo) {
    this.corporate.tw_contactos_corporativo.push(newContact);
  }

  private updateListContact() {
    const index = this.findIndexById(this.contactEditing.id);
    this.corporate.tw_contactos_corporativo[index] = this.contactEditing;
  }

  deleteContact(id: number) {
    this.spinner.show();
    this.corporateService.deleteContact(id).subscribe(
      (response) => {
        this.removeContactFromList(id);
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.showError("No se pudo eliminar el contacto");
      }
    );
  }

  private removeContactFromList(id: number) {
    const index = this.findIndexById(id);
    this.corporate.tw_contactos_corporativo.splice(index, 1);
  }

  private findIndexById(id: number): number {
    return this.corporate.tw_contactos_corporativo.findIndex(
      (contact) => contact.id === id
    );
  }

  updateCorporate() {
    this.spinner.show();
    const corporate: Corporate = this.getGeneralFormData();
    this.corporateService.updateCorporate(corporate).subscribe(
      (response) => {
        console.log(response);
        this.disableFormGenerales();
        this.editingGeneralData = false;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.showError("No se pudo actualizar el corporativo");
      }
    );
  }

  private getGeneralFormData(): any {
    const formData = this.formDatosGenerales.getRawValue();
    return {
      S_NombreCorto: formData.nombreCorto,
      S_NombreCompleto: formData.nombreCompleto,
      S_Activo: formData.status,
      D_FechaIncorporacion: formData.fechaIncorporacion,
      S_SystemUrl: formData.urlSistema,
      id: this.id,
      FK_Asignado_id: this.corporate.FK_Asignado_id,
      S_LogoURL: this.corporate.S_LogoURL,
    };
  }

  editCorporate() {
    this.editingGeneralData = true;
    this.enableFormGenerales();
  }

  private enableFormGenerales() {
    [
      "nombreCorto",
      "nombreCompleto",
      "status",
      "fechaIncorporacion",
      "urlSistema",
    ].forEach((item) => {
      this.formDatosGenerales.get(item).enable();
    });
  }

  private disableFormGenerales() {
    [
      "nombreCorto",
      "nombreCompleto",
      "status",
      "fechaIncorporacion",
      "urlSistema",
    ].forEach((item) => {
      this.formDatosGenerales.get(item).disable();
    });
  }

  goBack() {
    this.location.back();
  }

  cancelEdit() {
    this.disableFormGenerales();
    this.editingGeneralData = false;
  }

  private showError(msg: string) {
    swal.fire({
      title: "¡Error!",
      text: msg,
      icon: "error",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });
  }
}
