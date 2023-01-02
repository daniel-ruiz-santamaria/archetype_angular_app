import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersComponent } from './components/pages/answers/answers.component';
import { AssistantDataComponent } from './components/pages/assistant-data/assistant-data.component';
import { AuditComponent } from './components/pages/audit/audit.component';
import { FeedbackComponent } from './components/pages/feedback/feedback.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LuisComponent } from './components/pages/luis/luis.component';
import { QnamakerComponent } from './components/pages/qnamaker/qnamaker.component';
import { SupportComponent } from './components/pages/support/support.component';
import { UsersComponent } from './components/pages/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'anwers', component: AnswersComponent },
  { path: 'assitant-data', component: AssistantDataComponent },
  { path: 'audit', component: AuditComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'support', component: SupportComponent },
  { path: 'luis', component: LuisComponent },
  { path: 'qna-maker', component: QnamakerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
