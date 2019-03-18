import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { of } from 'rxjs';

import { ClientListComponent } from './client-list.component';
import { FilterListForTextPipe } from './../../pipe/filter-list-for-text.pipe';
import { EmptyListComponent } from './../../common/empty-list/empty-list.component';
import { ClientService } from './../service/client.service';

describe('ListComponent', () => {
    let component: ClientListComponent;
    let fixture: ComponentFixture<ClientListComponent>;
    let clientService: ClientService;

    const routes: Routes = [{
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }];
    const clientsMock = [{
            id: 1, name: 'name1', birthdate: new Date()
        }];
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ 
                ClientListComponent,
                EmptyListComponent,
                FilterListForTextPipe
            ],
            imports: [
                FormsModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes)
            ],
            providers: [
                ClientService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientListComponent);
        clientService = TestBed.get(ClientService);
        spyOn(clientService, 'getClient').and.returnValue(of(clientsMock));
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('getClient function should call ClientService.getClient service', () => {
        component.getClient();
        expect(clientService.getClient).toHaveBeenCalled();
        expect(component.clients).toEqual(clientsMock);
    });


    it('deleteClient function should call ClientService.deleteClient service', () => {
        spyOn(clientService, 'deleteClient').and.returnValue(of({}));
        spyOn(component, 'getClient');

        component.deleteClient(clientsMock[0]);

        expect(clientService.deleteClient).toHaveBeenCalled();
        expect(component.getClient).toHaveBeenCalled();
    });
});
