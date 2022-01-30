import { Component, OnInit , ElementRef } from '@angular/core';
import { Encuesta } from 'src/app/model/encuesta';
import { EncuestaService } from 'src/app/encuesta.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TipoMusica } from 'src/app/model/tipoMusica';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-encuesta',
  templateUrl: './crear-encuesta.component.html',
  styleUrls: ['./crear-encuesta.component.css']
})
export class CrearEncuestaComponent implements OnInit {
  public encuesta!: Encuesta;
  public tipoMusical: TipoMusica[] = [];
  public closeResult : string = '';
  public filtroEncuesta!: FormGroup;

  constructor(private modalService: NgbModal,private encuestaService : EncuestaService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.getGeneroMusical();
    this.filtroEncuesta = new FormGroup({
      email: new FormControl(),
      nameTipoMusica : new FormControl()
    });

    this.filtroEncuesta = this.fb.group({
      email : ['',Validators.email ],
      nameTipoMusica : ['',Validators.required]
    });
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }
    );
  }

  /**
   * Metodo que obtiene la lista de encuesta
   */
  public getGeneroMusical(): void{
    this.encuestaService.getEncuesta().subscribe(
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
  onEncuestaFilter(formEncuestaAdd: any): boolean{
    if (!formEncuestaAdd) {
      return false;
    } else {
      formEncuestaAdd["id"]="";
      console.log(formEncuestaAdd);
      this.encuestaService.postSaveEncuesta(formEncuestaAdd).subscribe(
        (response : Encuesta) => {
          this.encuesta = response;
        },(error : HttpErrorResponse)=>{
          console.log(error.headers);
          console.log(error.message);
          console.log(error.name);
        }
      );
      return true;
    }
  }


  
}
