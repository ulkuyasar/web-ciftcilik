import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent  {

  @Output() onClick = new EventEmitter<any>();
  label = 'Sil';
  className:string = "raised error"

  constructor() {
    this.className = "raised error";

  }

  functioncall(event) {
    this.onClick.emit(event);
  }
}
