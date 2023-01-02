export class AssistentData {
    partitionKey: string;
    rowKey: string;
    timestamp: Date;
    icon: string;
    key: string;
    link: string;
    value: string;

    constructor(jData: any) {
        this.partitionKey = String(jData['PartitionKey']);
        this.rowKey = String(jData['RowKey']);
        this.timestamp = new Date(Date.parse(jData['timestamp']));
        this.icon = String(jData['icon']);
        this.key = String(jData['key']);
        this.link = String(jData['link']);
        this.value = String(jData['value']);
    }
}
