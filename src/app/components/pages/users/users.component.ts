import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { User } from 'src/app/models/user.model';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import { Subject } from 'rxjs';
import { Audit } from 'src/app/models/audit.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private _dhs: DataHandlerService;
  dtOptions: any = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

  dtOptionsSessions: any = {};
  dtTriggerSessions: Subject<ADTSettings> = new Subject<ADTSettings>();

  dtOptionsAudits: any = {};
  dtTriggerAudits: Subject<ADTSettings> = new Subject<ADTSettings>();

  // data
  users: User[];
  userMap: Map<string,User[]>;
  userSessions : SuplifiedUserData[];

  selected: any;
  audits: any[] = [];
  selectedIndex: number = -1;

  selectedSession: any;
  selectedSessionIndex: number = -1;

  constructor(private dhs: DataHandlerService) {
    this._dhs = dhs;
    this.users = [];
    this.userMap = new Map();
    this.userSessions = [];
   }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      select: {
        style: 'single',
        info: true
      },
    };
    this.dtOptionsSessions = {
      pageLength: 10,
      select: {
        style: 'single',
        info: true
      },
    };
    this.dtOptionsSessions = {
      pageLength: 10,
      select: {
        style: 'single',
        info: true
      },
    };
    this._dhs.getUsers().then(x =>{
      this.users = x;

      this.users.forEach(u=>{
        if (!this.userMap.has(u.idDocument)) {
          this.userMap.set(u.idDocument,[]);
        }
        this.userMap.get(u.idDocument)?.push(u);
      });

      this.userSessions = this.getSessionByUser();
      this.userSessions.sort((a,b)=> (a.sessions>b.sessions?-1:1));
      console.log('this.userSessions ',this.userSessions );

      this.dtTrigger.next(this.dtOptions);
    })
  }

  public getSessionByUser() {
    let sessions : SuplifiedUserData[] = [];
    for (let key of this.userMap.keys()) {
      let names = [];
      let users = this.userMap.get(key);
      if (users!=undefined) {
        for (let u of users) {
          names.push(u.fullName)
        }
      }
      sessions.push({
        'idDocument': key,
        'sessions': (this.userMap.get(key)!=undefined)?this.userMap.get(key)?.length:0,
        'userName': this.getMaxOccurrence(names)
      });
    }
    return sessions;
  }

  selectedRow(index: number) {
    let selectUser =  this.userSessions[index];
    this.selected = this.userMap.get(selectUser.idDocument);
    this.selectedIndex = index;
  }

  selectedSessionRow(index: number) {
    let selectedSession =  this.selected[index];
    this.audits = this.getAuditBySessions(selectedSession.idSession);
    this.selectedSessionIndex = index;
    console.log('this.selectedSession ',this.selectedSession )
  }


  getMaxOccurrence(arr: string[]) {
    let counter = new Map<string,number>();
    for (let a of arr) {
      if (counter.has(a)) {
        let v = counter.get(a);
        if (v!=undefined)
          counter.set(a,v+1);
      } else {
        counter.set(a,1);
      }
    }

    let max = -1;
    let communName = "";
    for (let key of counter.keys()) {
      let v = counter.get(key);
      if (v!=undefined && v>max) {
        max = v;
        communName = key;
      }
    }
    return communName;
  }

  public getAuditBySessions(idSession: string){
    let audits: Audit[] = [];
    let result = this._dhs.getAuditsBySession(idSession);
    if (!result)
      return [];
    else
      return result;
  }
  
}

export interface SuplifiedUserData {
  idDocument: string;
  sessions: any;
  userName: string;
}