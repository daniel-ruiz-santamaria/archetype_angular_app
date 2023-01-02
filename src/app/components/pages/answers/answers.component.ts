import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Answer } from 'src/app/models/answer.model';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {


  private _dhs: DataHandlerService;
  dtOptions: any = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  answers: Answer[];
  overlayRef: any;
  closeResult: string = '';
  

  constructor(private dhs: DataHandlerService) { 
    this._dhs = dhs;
    this.answers = [];
  }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      select: {
        style: 'single',
        info: true
      },
    };

    this._dhs.getAnswers().then(x =>{
      this.answers = x;
      this.answers.sort((a, b) => a.partitionKey < b.partitionKey ? -1 : 1).sort((a, b) => a.rowKey < b.rowKey ? -1 : 1)
      this.dtTrigger.next(this.dtOptions);
    })
  }

}
