import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import TaskModel from '../models/task';
import TaskListModel from '../models/taskList';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  taskListId: string = ''
  titleTaskList: string = '';

  constructor(
    private router: Router,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
  ) {  }

  ngOnInit(): void {
    this.taskService.getAllTaskLists().subscribe((data: TaskListModel[]) => {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.taskListId = params.taskListId;
        this.titleTaskList = data.filter(t => t._id == this.taskListId)[0].title;
      });
    });
  }

  createNewTask(title: string){
    if (!title){
      alert('Title cannot be empty!!');
      return;
    }
    this.taskService.createTask(this.taskListId, title).subscribe((data: TaskModel) => {
      this.router.navigate(['/task-list',data._taskListId]);
    }, (error) => {
      alert('ocurrio un error!');
    });
  }
}
