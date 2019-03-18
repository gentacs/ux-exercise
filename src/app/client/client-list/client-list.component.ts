import { Component, OnInit } from '@angular/core';
import { ClientService } from './../service/client.service';
import { Client } from './../class/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
    clients: Array<Client>;
    clientsFiltered: Array<Client>;
    textFilter: string = '';

    constructor(private clientService: ClientService) { }

    ngOnInit() {
       this.getClient(); 
    }

    getClient() {
        this.clientService.getClient().subscribe(
            (data:Array<Client>) => { 
                this.clients = data;
            }
        );
    }

    deleteClient(client: Client) {
       this.clientService.deleteClient(client.id).subscribe(
        () => {
            this.getClient();
        }
       ); 
    }
}
