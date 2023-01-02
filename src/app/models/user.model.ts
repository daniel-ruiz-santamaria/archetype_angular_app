export class User {

    public idSession: string;
    public idDocument: string;
    public idRegistredUser : string;
    public fullName : string;
    public isLoged : boolean;
    public timestamp: Date;


    constructor(jData: any) {
        this.idSession = String(jData['idSession']);
        this.idDocument = String(jData['IdDocument']);
        this.idRegistredUser = String(jData['IdRegistredUser']);
        this.fullName = String(jData['fullName']);
        this.isLoged = Boolean(jData['isLoged']);
        this.timestamp = new Date(Date.parse(jData['timestamp']));
    }
}
