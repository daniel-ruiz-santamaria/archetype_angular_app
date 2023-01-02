import { Injectable } from '@angular/core';
import { Answer } from '../models/answer.model';
import { Audit } from '../models/audit.model';
import { Feedback } from '../models/feedback.model';
import { SuportRequest } from '../models/suport-request.model';
import { User } from '../models/user.model';
import { AzureTableHandlerService } from './azure-table-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private _aths: AzureTableHandlerService;
  private userMap: Map<string,User> = new Map();
  private auditMap: Map<string,Audit> = new Map();
  private auditsBySession: Map<string,Audit[]> = new Map();

  constructor(private aths: AzureTableHandlerService) {
    this._aths = aths;
    this.populateAll();
  }

  public  populateAll() {
    this.populatedUsers().then(() => {
      console.log('userMap',this.userMap);
      this.populatedAudits().then(() =>{
        console.log('auditMap',this.auditMap);
      });
    });
  }


  public async populatedUsers() {
    await this._aths.getItemsFromTable('users',undefined).then(items => {
      items.forEach(item => {
        let user = new User(item);
        this.userMap.set(user.idSession,user);
      });
    });
  }

  public async populatedAudits() {
    await this._aths.getItemsFromTable('audit',undefined).then(items => {
      items.forEach(item => {
        let audit = new Audit(item);
        if (this.userMap.has(audit.idSession) )  {
          audit.setUser(this.userMap.get(audit.idSession));
        }
        if (!this.auditsBySession.has(audit.idSession)) {
          this.auditsBySession.set(audit.idSession,[])
        }
        this.auditsBySession.get(audit.idSession)?.push(audit);
        this.auditMap.set(audit.idSession,audit);
      });
    });
  }

  public getSupportRequests() : Promise<SuportRequest[]>{
    return this._aths.getItemsFromTable('supportRequest',undefined).then((data:any) => {
      let supports: SuportRequest[] = [];
      data.forEach((i:any) => {
        supports.push(new SuportRequest(i));
      });
      return new Promise((resolve, reject) => {
        resolve(supports);
      });
    });
  }

  public getFeedback() : Promise<Feedback[]>{
    return this._aths.getItemsFromTable('feedback',undefined).then((data:any) => {
      let items: Feedback[] = [];
      data.forEach((i:any) => {
        items.push(new Feedback(i));
      });
      return new Promise((resolve, reject) => {
        resolve(items);
      });
    });
  }

  public getAnswers() : Promise<Answer[]>{
    return this._aths.getItemsFromTable('answers',undefined).then((data:any) => {
      let items: Answer[] = [];
      data.forEach((i:any) => {
        items.push(new Answer(i));
      });
      return new Promise((resolve, reject) => {
        resolve(items);
      });
    });
  }

  public getUsers() : Promise<User[]>{
    return this._aths.getItemsFromTable('users',undefined).then((data:any) => {
      let items: User[] = [];
      data.forEach((i:any) => {
        items.push(new User(i));
      });
      return new Promise((resolve, reject) => {
        resolve(items);
      });
    });
  }

  public updateSupportRequest(sr:SuportRequest ) {
    return this._aths.updateEntity('supportRequest',sr.getEntityToSave()).then((r:any) => {
      return new Promise((resolve, reject) => {
        resolve(r);
      });
    });
  }

  public getAuditsBySession(idSession: string) {
    return this.auditsBySession.get(idSession);
    }

}
