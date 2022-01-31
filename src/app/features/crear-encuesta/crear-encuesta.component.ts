import { Component, OnInit , ElementRef, Output } from '@angular/core';
import { Encuesta } from 'src/app/model/encuesta';
import { EncuestaService } from 'src/app/encuesta.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TipoMusica } from 'src/app/model/tipoMusica';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-crear-encuesta',
  templateUrl: './crear-encuesta.component.html',
  styleUrls: ['./crear-encuesta.component.css']
})
export class CrearEncuestaComponent implements OnInit {
  public encuesta!: Encuesta;
  public tipoMusical: TipoMusica[] = [];
  public closeResult : string = '';
  public formEncuesta!: FormGroup;
  public notificationForm: boolean =false;
  public emailValido! :any;
  public responseVal : Boolean = false;
  @Output() notificacionOut!: boolean ;

  constructor(private modalService: NgbModal,private encuestaService : EncuestaService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.getGeneroMusical();
    this.formEncuesta = new FormGroup({
      email: new FormControl(),
      nameTipoMusica : new FormControl()
    });

    this.formEncuesta = this.fb.group({
      email : ['',Validators.email ],
      nameTipoMusica : ['',Validators.required]
    });
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      this.formEncuesta.reset();
      return  `with: ${reason}`;
    }
  }

  /**
   * Metodo que obtiene la lista de encuesta
   */
  public getGeneroMusical(): void{
    this.encuestaService.getGeneroMusical().subscribe(
      (response : TipoMusica[]) => {
        this.tipoMusical = response;
      },(error : HttpErrorResponse)=>{
        console.log(error.headers);
        console.log(error.message);
        console.log(error.name);
      }
    );
  }

  /**
   * Metodo que guarda las encuestas del formulario
   */
  onEncuestaSave(formEncuestaAdd: any, form : any): any{
    console.log(form);
    if (form.status !=="VALID") {
      this.notificationForm = false;
      return this.notificationForm;
    } else {
      formEncuestaAdd["id"]="";
      //Llamada al servicio guardar encuesta
      const var1 = this.encuestaService.postSaveEncuesta(formEncuestaAdd).subscribe(
        (response : any) => {
          this.encuesta = response;
        },(error : HttpErrorResponse)=>{
          console.log(error.headers);
          console.log(error.message);
          console.log(error.name);
        }
      );     
    }

      this.notificationForm = true;
      this.encuestaService.setValue(this.notificationForm);
      this.refresh();
    return this.notificationForm;
  }

  /**Valida el mail si ya existe */
  validaEmail(email : string): boolean{    
    this.encuestaService.getEmailExiste(email).subscribe(
      (response : any) => {
         this.emailValido = response;
      },(error : HttpErrorResponse)=>{
        console.log(error.headers);
        console.log(error.message);
        console.log(error.name);
      }
    );    
    return this.emailValido !== '' ? this.responseVal = true : this.responseVal= false ;
  }

  refresh(): void { window.location.reload(); }
  
}
