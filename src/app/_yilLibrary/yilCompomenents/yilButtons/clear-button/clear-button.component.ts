import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-clear-button',
  templateUrl: './clear-button.component.html',
  styleUrls: ['./clear-button.component.css']
})
export class ClearButtonComponent {


  @Output() onClick = new EventEmitter<any>();
  label = 'Temizle';
  className:string = "raised"

  constructor() {
    this.className = "raised";

  }

  functioncall(event) {
    this.onClick.emit(event);
  }

}
