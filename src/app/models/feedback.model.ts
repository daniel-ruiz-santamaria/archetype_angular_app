export class Feedback {
    idFeedback: string;
    idSession: string;
    calification: string;
    comments: string;
    timestamp: Date;

    constructor(jData: any) {
        this.idFeedback = String(jData['IdFeedback']);
        this.idSession = String(jData['IdSession']);
        this.calification = String(jData['calification']);
        this.comments = String(jData['comments']);
        this.timestamp = new Date(Date.parse(jData['timestamp']));
    }
}
