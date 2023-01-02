export class Answer {
    partitionKey: string;
    rowKey: number;
    timestamp: Date;
    answer: string;

    constructor(jData: any) {
        this.partitionKey = String(jData['partitionKey']);
        this.rowKey = Number(String(jData['rowKey']));
        this.timestamp = new Date(Date.parse(jData['timestamp']));
        this.answer = String(jData['answer']);
    }
}
