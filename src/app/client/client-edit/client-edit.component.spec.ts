import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditComponent } from './client-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { ClientService } from './../service/client.service';
import { Client } from './../class/client';

describe('ClientEditComponent', () => {
    let component: ClientEditComponent;
    let fixture: ComponentFixture<ClientEditComponent>;
    let clientService: ClientService;

    const routes: Routes = [{
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }];
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ClientEditComponent ],
            imports: [
                FormsModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(routes),
                NgbModule.forRoot()
            ],
            providers: [
                {provide: ActivatedRoute, useValue: {
                    params: of({clientId: null})
                }},
                ClientService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientEditComponent);
        clientService = TestBed.get(ClientService);
        component = fixture.componentInstance;
        component.client = {id: null, name: null, birthdate: null};
        fixture.detectChanges();
        spyOn(clientService, 'getClientById').and.returnValue(of({}));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.client).toEqual(new Client());
        expect(component.isNewClient).toBeTruthy();
    });

    it('save function should call saveNewClient', () => {
        spyOn(component, 'saveNewClient');
    
        component.save();

        expect(component.saveNewClient).toHaveBeenCalled();
    });

    it('save function should call saveEditClient', () => {
        const clientData = {
              id: 1, name: 'name', birthdate: new Date()
        };
        component.isNewClient = false;
        spyOn(component, 'saveEditClient');
        component.formClient = formBuilder.group(clientData);
    
        component.save();

        expect(component.saveEditClient).toHaveBeenCalled();
        expect(component.client).toEqual(clientData);
    });
    
    it('saveNewClient function should call clientService.newClient', () => {
        const clientData = {
              id: 1, name: 'name', birthdate: new Date()
        };
        spyOn(clientService, 'newClient').and.returnValue(of());
    
        component.saveNewClient(clientData);

        expect(clientService.newClient).toHaveBeenCalled();
    });
    
    it('saveEditClient function should call clientService.updateClient', () => {
        const clientData = {
              id: 1, name: 'name', birthdate: new Date()
        };
        spyOn(clientService, 'updateClient').and.returnValue(of());
    
        component.saveEditClient(clientData);

        expect(clientService.updateClient).toHaveBeenCalled();
    });
});
