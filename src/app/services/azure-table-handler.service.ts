import { Injectable } from '@angular/core';
import { TableServiceClient, AzureNamedKeyCredential,TableClient, odata,AzureSASCredential   } from '@azure/data-tables';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AzureTableHandlerService {

  private account: string = 'storagepoc5';
  private accountKey: string = '5byHFKBRaZPw4H3MFa5UgbNyo2UDjZWxkGD14422PmfdOj7j+hlXUMeDJbc5VBkVBLCXJe/PX63XKOxXaBlxPw==';
  private connectionString: string = "DefaultEndpointsProtocol=https;AccountName=storagepoc5;AccountKey=5byHFKBRaZPw4H3MFa5UgbNyo2UDjZWxkGD14422PmfdOj7j+hlXUMeDJbc5VBkVBLCXJe/PX63XKOxXaBlxPw==;EndpointSuffix=core.windows.net"
  private accountURL: string;
  private credentials: AzureNamedKeyCredential;
  private sas: string = '?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2122-12-21T17:45:53Z&st=2022-12-21T09:45:53Z&spr=https&sig=F3zdf4%2BjNHHGMDOJr80MEmONfGK2ySAqRd%2FsVasbBmE%3D'
  private serviceClient: TableServiceClient;

  constructor(private http: HttpClient) {
    this.accountURL = `https://${this.account}.table.core.windows.net`
    this.credentials = new AzureNamedKeyCredential(this.account, this.accountKey);
    this.serviceClient = new TableServiceClient(
      `https://${this.account}.table.core.windows.net`,
      new AzureSASCredential(this.sas)
    );
  }


  public async listTables(){

    let tablesIter = this.serviceClient.listTables();
    let tables = [];
    for await (const table of tablesIter) {
      console.log('table',table);
      tables.push(table.name)
    }
    return tables;
  }

  public async getItemsFromTable(tableName:string, partitionKey: string | undefined) {
    console.log('partitionKey',partitionKey);
    let items = [];
    const client = new TableClient(
      `https://${this.account}.table.core.windows.net`,
      tableName,
      new AzureSASCredential(this.sas)
    );
    let entitiesIter = client.listEntities({ queryOptions: partitionKey? { filter: odata`PartitionKey eq '`+partitionKey+`'` }: { filter: partitionKey }});
    for await (const entity of entitiesIter) {
      items.push(entity);
    }
    return items;
  }

  public async updateEntity(tableName:string,entity: any)  {
    const client = new TableClient(
      `https://${this.account}.table.core.windows.net`,
      tableName,
      new AzureSASCredential(this.sas)
    );
    let result = client.updateEntity(entity,"Replace");
    return
  }

}
