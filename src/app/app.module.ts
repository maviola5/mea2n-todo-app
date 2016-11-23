import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';

import { AUTH_PROVIDERS } from './services/auth.service';

import { LoggedInGuard } from './loggedIn.guard';
import { FooterComponent } from './footer/footer.component';
import { MessageComponent } from './message/message.component';
import { TaskComponent } from './task/task.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'todo', component: TodoComponent, canActivate: [LoggedInGuard]},
  { path: '', redirectTo: 'todo', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    TodoComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    AUTH_PROVIDERS,
    LoggedInGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
