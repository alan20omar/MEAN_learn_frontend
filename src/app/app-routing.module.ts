import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTasklistComponent } from './new-tasklist/new-tasklist.component';

import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  { path: 'task-list', component: TaskComponent },
  { path: 'task-list/:taskListId', component: TaskComponent },
  { path: 'new-task-list', component: NewTasklistComponent },
  { path: 'task-list/:taskListId/new-task', component: NewTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
