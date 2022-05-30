import { Component } from '@angular/core';
import * as $ from 'jquery';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-app';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
    translate.use('es');
    console.log('En el constructor de app.components')
  }

  ngOnInit() {
    
    //Toggle Click Function
    $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    });
    }
}
