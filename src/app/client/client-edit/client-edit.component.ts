import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from './../class/client';
import { ClientService } from './../service/client.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ClientEditComponent implements OnInit {

    @Input() client: Client;
    formClient: FormGroup;
    isNewClient: boolean = false;
    maxdate;
    mindate;
    startDate;
    birthdate;

    constructor(
        private ngbCalendar: NgbCalendar,
        private route: ActivatedRoute, 
        private router: Router,
        private clientService: ClientService) { 
        
        this.formClient = new FormGroup({
            name: new FormControl('', Validators.required),
            birthdate: new FormControl(''),
            id: new FormControl()
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const { clientId } = params;

            if ( clientId ) {

               this.getClientData(clientId); 
            }else {
                this.client = new Client();
                this.isNewClient = true;
            }
        });
        const today = this.ngbCalendar.getToday();
        this.maxdate = today;
        this.mindate = {...today, year: today.year - 100}; 
    }

    getClientData(id) {
        this.clientService.getClientById(id).subscribe (
            (data: Client) => {
                this.client = data;
                this.client.birthdate = new Date(this.client.birthdate); 
                this.formClient.setValue(this.client);
                this.startDate = { 
                    year: this.client.birthdate.getFullYear(), 
                    month: this.client.birthdate.getMonth(), 
                    day: this.client.birthdate.getDate()
                };
            }
        );
    }

    save() {
        this.client = this.formClient.value;

        if (this.isNewClient){
            this.saveNewClient(this.client);
        } else {
            this.saveEditClient(this.client);
        }
    }

    saveNewClient(client) {
        this.clientService.newClient(client).subscribe(() => {
            this.cancel();
        });
    }

    saveEditClient(client) {
        this.clientService.updateClient(client).subscribe(() => {
            this.cancel();
        }); 
    }

    cancel() {
        this.router.navigate(['/client'])
    }
}
