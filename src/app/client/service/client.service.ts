import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './../class/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
    private baseUrl: string = 'https://hello-world.innocv.com/api/User';

    constructor(private http: HttpClient) { }

    getClient() {
        return this.http.get(this.baseUrl);
    }

    getClientById(id: number) {
        return this.http.get(this.baseUrl.concat('/', id.toString()));
    }

    updateClient(client: Client) {
        return this.http.put(this.baseUrl, client, {}); 
    }

    newClient(client: Client) {
        return this.http.post(this.baseUrl, client, {});
    }

    deleteClient(id: number) {
        return this.http.delete(this.baseUrl.concat('/', id.toString()));
    }
}
