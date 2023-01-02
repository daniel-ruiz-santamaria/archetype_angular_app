import { User } from "./user.model";

export class Audit {
    idAudit: string;
    idSession: string;
    answer : string;
    channelId : string;
    channelName : string;
    date : Date;
    idUser : string;
    intent : string;
    nameUser : string;
    query : string;
    score : string;
    user: User | undefined;

    constructor(jData: any) {
        this.idAudit = String(jData['IdAudit']);
        this.idSession = String(jData['IdSession']);
        this.answer = String(jData['answer']);
        this.channelId = String(jData['channelId']);
        this.channelName = String(jData['channelName']);
        this.date = new Date(Date.parse(jData['date']));
        this.idUser = String(jData['idUser']);
        this.intent = String(jData['intent']);
        this.nameUser = String(jData['nameUser']);
        this.query = String(jData['query']);
        this.score = String(jData['score']);
        this.user = undefined;
    }

    public setUser(user:User | undefined) {
        this.user = user;
    }
}
