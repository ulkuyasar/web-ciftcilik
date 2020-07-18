import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() label: string;
  @Input() className: string;
  @Output() onClick = new EventEmitter<any>();
  
  constructor() { 
    this.className = "raised"
  }


  onClickButton(event) {
    this.onClick.emit(event);
  }

}
