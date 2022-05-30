export class SearchObj {
    user: string;
    imageURL: string;
    imageContent : any;
    vienaCodes : string[];
    nizaCodes : string[];

    constructor() {
        this.user = "";
        this.imageURL = "";
        this.imageContent = "";
        this.vienaCodes = [];
        this.nizaCodes = [];
    }
}
