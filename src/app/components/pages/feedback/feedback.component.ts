import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Feedback } from 'src/app/models/feedback.model';
import { DataHandlerService } from 'src/app/services/data-handler.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  private _dhs: DataHandlerService;
  dtOptions: any = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

  // data
  feedbacks: Feedback[];

  constructor(private dhs: DataHandlerService) { 
    this._dhs = dhs;
    this.feedbacks = [];
  }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      select: {
        style: 'single',
        info: true,
      },
    };
    this._dhs.getFeedback().then(x =>{
      this.feedbacks = x;
      console.log('this.feedbacks',this.feedbacks);
      this.dtTrigger.next(this.dtOptions);
    })
  }

}
