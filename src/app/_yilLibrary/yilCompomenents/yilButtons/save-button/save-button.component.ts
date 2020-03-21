import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent  {

  @Output() onClick = new EventEmitter<any>();

  label: string = "Kaydet"

  constructor() {}

  functioncall(event) {
    this.onClick.emit(event);
  }


}
