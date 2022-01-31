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
  public flag!: boolean;

  constructor(private encuestaService : EncuestaService) { }

  ngOnInit(): void {
    this.getEncuestas();
    this.encuestaService.getValue().subscribe((value) => {
      this.flag = value;
    });
    console.log("this.flag " + this.flag);
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
