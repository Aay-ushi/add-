import { Injectable } from "@angular/core";
// import { Http } from "@angular/http";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Services{
     address;
    constructor(private http:HttpClient) {
        this.address="";

    }
    serverServices(){
        return this.http.get('getData',{
            params: {
                _config:
                    '{ "type": "COMMON"}'
            }
        });
    }
    BU(BUId){
        return this.http.get('getBU',{
            params: {
                _config:
                    '{ "type": "COMMON"}'
            }
        });
    }
}