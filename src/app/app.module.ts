import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { TagInputModule } from 'ngx-chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/commons/header/header.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// Import the library
import { NgxTagsInputModule } from 'ngx-tags-input';
import { UsersComponent } from './components/pages/users/users.component';
import { AuditComponent } from './components/pages/audit/audit.component';
import { SupportComponent } from './components/pages/support/support.component';
import { FeedbackComponent } from './components/pages/feedback/feedback.component';
import { AssistantDataComponent } from './components/pages/assistant-data/assistant-data.component';
import { AnswersComponent } from './components/pages/answers/answers.component';
import { LuisComponent } from './components/pages/luis/luis.component';
import { QnamakerComponent } from './components/pages/qnamaker/qnamaker.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UsersComponent,
    AuditComponent,
    SupportComponent,
    FeedbackComponent,
    AssistantDataComponent,
    AnswersComponent,
    LuisComponent,
    QnamakerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    TagInputModule, 
    NgxTagsInputModule,
    
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
