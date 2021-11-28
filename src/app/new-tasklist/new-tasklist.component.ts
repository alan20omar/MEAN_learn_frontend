import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import TaskListModel from '../models/taskList';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-new-tasklist',
  templateUrl: './new-tasklist.component.html',
  styleUrls: ['./new-tasklist.component.scss']
})
export class NewTasklistComponent implements OnInit {

  constructor(
    private router: Router,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
  }

  createNewTaskList(title: string){
    if (!title){
      alert('Title cannot be empty!!');
      return
    }

    this.taskService.createTaskList(title).subscribe((data: TaskListModel)=>{
      this.router.navigate(['task-list',data._id]);
    },(error) => {
      alert('ocurrio un error!');
    });
  }

}
