import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';
import { ClientService } from './client/service/client.service';
import { FilterListForTextPipe } from './pipe/filter-list-for-text.pipe';
import { EmptyListComponent } from './common/empty-list/empty-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientEditComponent,
    FilterListForTextPipe,
    EmptyListComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpClientModule,
    AppRoutingModule,
	NgbModule,
	ReactiveFormsModule
  ],
  providers: [ ClientService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
