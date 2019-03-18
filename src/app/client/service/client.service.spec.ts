import { TestBed, inject } from '@angular/core/testing';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientService } from './client.service';

describe('ClientService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            HttpClientTestingModule
        ],
        providers: [
            HttpClient
        ]
    }));

    it('should be created', () => {
        const service: ClientService = TestBed.get(ClientService);
        expect(service).toBeTruthy();
    });

    fit('getClient should return Observable<any>', inject([HttpTestingController], (httpTestingController: HttpTestingController) => {
        const service: ClientService = TestBed.get(ClientService);
        const mockData = [{id:123, name: 'myName', birthdate: new Date()}];

        service.getClient().subscribe(data => {
            expect(data).toEqual(mockData);
        });
        const req = httpTestingController.expectOne('https://hello-world.innocv.com/api/User');
        req.flush(mockData);

        httpTestingController.verify();
    }));
});
