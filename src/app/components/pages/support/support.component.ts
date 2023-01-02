import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { TagModel } from 'ngx-chips/core/tag-model';
import { Observable, Subject } from 'rxjs';
import { SuportRequest } from 'src/app/models/suport-request.model';
import { DataHandlerService } from 'src/app/services/data-handler.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;

  private _dhs: DataHandlerService;
  public supportData: SuportRequest[];
  private supportDataObj: any = [];

  selected: any;
  selectedIndex: number = -1;
  dtOptions: any = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  states = ['','Abierta', 'Cerrada', 'En proceso'];
  changed = false;

  constructor(private dhs: DataHandlerService) { 
    this._dhs = dhs;
    this.supportData = []
  }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      select: {
        style: 'single',
        info: true,
      },
    };
    console.log('inicializando');
    this._dhs.getSupportRequests().then(x =>{
      this.supportData = x;
      this.supportData.forEach(it => {
        this.supportDataObj.push({
          "idSession": it.idSession
        });
      });
      console.log('this.supportData',this.supportData);
      this.dtTrigger.next(this.dtOptions);
    })
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  selectedRow(index: number) {
    this.selected = this.supportData[index];
    this.selectedIndex = index;
  }

  onChange() {
    this.changed = true;
  }

  save() {
    this.supportData[this.selectedIndex] = this.selected;
    console.log('Saving');
    this._dhs.updateSupportRequest(this.selected).then((r:any)=>{
      console.log('saved',r);
    });
  }

}
