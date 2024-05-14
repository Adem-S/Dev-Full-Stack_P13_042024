import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSelectionComponent } from './components/user-selection/user-selection.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'select-role', component: UserSelectionComponent },
  {
    path: 'conversations',
    canActivate: [AuthGuard],
    component: ConversationsComponent,
  },
  { path: 'chat/:id', canActivate: [AuthGuard], component: ChatComponent },
  { path: '', redirectTo: '/select-role', pathMatch: 'full' },
  { path: '**', redirectTo: '/select-role' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
