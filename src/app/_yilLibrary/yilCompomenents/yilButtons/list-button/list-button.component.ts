import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-button',
  templateUrl: './list-button.component.html',
  styleUrls: ['./list-button.component.css']
})
export class ListButtonComponent {


  @Output() onClick = new EventEmitter<any>();
  label = 'Listele';
  className:string = "raised success"

  constructor() {
    this.className = "raised success";

  }

  functioncall(event) {
    this.onClick.emit(event);
  }


}
