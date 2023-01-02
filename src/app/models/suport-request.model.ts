export class SuportRequest {
    idRegistredUser: string;
    userFullName: string;
    idSession: string;
    idSupporRequest: string;
    departmentId: string;
    departmentName: string;
    documentType: string;
    documentId: string;
    email: string;
    phone: string;
    request: string;
    timestamp: Date;
    responses: string[];
    state: string;

    constructor(jData: any) {
        this.idRegistredUser = String(jData['IdRegistredUser']);
        this.userFullName = String(jData['userFullName']);
        this.idSession = String(jData['IdSession']);
        this.idSupporRequest = String(jData['IdSupporRequest']);
        this.departmentId = String(jData['departmentId']);
        this.departmentName = String(jData['departmentName']);
        this.documentType = String(jData['documentType']);
        this.documentId = String(jData['documentId']);
        this.email = String(jData['email']);
        this.phone = String(jData['phone']);
        this.request = String(jData['request']);
        this.timestamp = new Date(Date.parse(jData['timestamp']));
        this.responses = [];
        if (jData['responses']) {
            this.responses = String(jData['responses']).split(';');
        }
        this.state = String(jData['state']);
    }

    getResponsesAsString() {
        if (this.responses.length >0) {
            return this.responses.join("<BR>");
        } else {
            return "";
        }
    }

    getStateAsString() {
        if (this.state !== 'undefined') {
            return this.state;
        } else {
            return "";
        }
    }

    getEntityToSave() {
        return {
            partitionKey: this.idSupporRequest,
            rowKey: this.idSession,
            IdRegistredUser: this.idRegistredUser,
            IdSession: this.idSession,
            IdSupporRequest: this.idSupporRequest,
            departmentId: this.departmentId,
            departmentName: this.departmentName,
            documentId: this.departmentId,
            documentType: this.documentType,
            email: this.email,
            phone: this.phone,
            request: this.request,
            responses: (this.responses.length>0)?this.responses.join(';'):null,
            state: this.state,
            userFullName: this.userFullName
        }
    }
}
