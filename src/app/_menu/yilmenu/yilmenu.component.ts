import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { jqxMenuComponent } from 'jqwidgets-ng/jqxmenu'

@Component({
  selector: 'app-yilmenu',
  templateUrl: './yilmenu.component.html',
  styleUrls: ['./yilmenu.component.css']
})
export class YilmenuComponent implements OnInit {

  @ViewChild('menuReference', { static: false }) menuReference: jqxMenuComponent;
	
	getWidthMenu() : any {
		if (document.body.offsetWidth < 600) {
			return '90%';
		}	
		return 600;
	}
  constructor() { }

  ngOnInit() {
  }

}
