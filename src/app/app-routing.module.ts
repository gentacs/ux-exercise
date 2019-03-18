import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';

const routes: Routes = [
    {
        path: 'client',
        component: ClientListComponent
    },
    {
       path: 'client/new',
       component: ClientEditComponent
    },
    {
        path: 'client/:clientId',
        component: ClientEditComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
