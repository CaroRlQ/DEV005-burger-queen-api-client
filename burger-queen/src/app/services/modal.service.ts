import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  constructor() { }
  $modal= new EventEmitter<any>();
  $id= new EventEmitter<any>();
  $dataItem = new EventEmitter<any>()
}
