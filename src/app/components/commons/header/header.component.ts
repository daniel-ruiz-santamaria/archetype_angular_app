import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false;
  language = "es";

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    $(document).ready(function () {
        
      $('#dismiss, .overlay').on('click', function () {
          $('#sidebar').removeClass('active');
          $('.overlay').removeClass('active');
      });
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').addClass('active');
          $('.overlay').addClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });
    });
  }


  changeLanguage(lang: string) {

    this.language = lang;
    this.translate.use(lang);
  }

}
