import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/encuesta.service';
import { Encuesta } from 'src/app/model/encuesta';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  
  public Encuestas : Encuesta[] = [];

  constructor(private encuestaService : EncuestaService) { }

  ngOnInit(): void {
    this.getEncuestas();
  }

  public getEncuestas():void{
    this.encuestaService.getEncuesta().subscribe(
      (response: Encuesta[]) => {
        this.Encuestas = response;
      },(error : HttpErrorResponse)=>{
        console.log(error.headers);
        console.log(error.message);
        console.log(error.name);
      }
    );
  }

}
