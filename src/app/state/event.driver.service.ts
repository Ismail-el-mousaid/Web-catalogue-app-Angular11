import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ActionEvent} from './product.state';


@Injectable({providedIn:"root"})
export class EventDriverService{
  //les messages publiés
  sourceEventSubject:Subject<ActionEvent> = new Subject<ActionEvent>();
  //les composantes qui font subscribe
  sourceEventSubjectObservable=this.sourceEventSubject.asObservable();

  


  //publier un evenement
  publishEvent(event:ActionEvent){
    this.sourceEventSubject.next(event);
  }


}
