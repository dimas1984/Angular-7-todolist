
export class Todo{
    id:number;
    title:string;
    date?:any;  // ?: menunjukan bahwa property ini bersifat opsional
    complete:false;

    //constructor cara pertama
    // constructor(id,title,date,complete){
    //     this.id=id;
    //     this.title= title;
    //     this.date= date;
    //     this.complete=complete
    // }

    //constructor cara kedua
    constructor(value:Object={}){
        Object.assign(this,value);
    }
}