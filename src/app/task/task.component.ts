import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import TaskModel from '../models/task';
import TaskListModel from '../models/taskList';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasksLists: TaskListModel[] = [];
  tasks: TaskModel[] = [];
  constructor(
    private taskService: TaskService,
    private activateRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.taskService.getAllTaskLists().subscribe((data: TaskListModel[]) => {
      this.tasksLists = data;
      // this.router.navigate(['task-list/', this.tasksLists[0]._id]);
    });
    
    this.activateRoute.params.subscribe((params: Params) => {
      const taskListId = params.taskListId;
      if(taskListId){
        this.taskService.getAllTasks(taskListId).subscribe((data: TaskModel[]) => {
          this.tasks = data;
        });
      }
    });
  }

  taskClicked(task: TaskModel){
    this.taskService.updateTaskStatus(task).subscribe((data: TaskModel) => {
      task.completed = data.completed;
    });
  }

  deleteTaskList(taskList: TaskListModel){
    this.taskService.deleteTaskList(taskList).subscribe((data: TaskListModel) => {
      this.tasksLists = this.tasksLists.filter(t => t._id != data._id);
    });
  }

  deleteTask(task: TaskModel){
    this.taskService.deleteTask(task).subscribe((data: TaskModel) => {
      this.tasks = this.tasks.filter(t => t._id != data._id);
    });
  }

  createNewTask(){
    if (!this.tasksLists){
      alert('Please create a new task list first!');
      return;
    }
    this.activateRoute.params.subscribe((params: Params) => {
      const taskListId = params.taskListId;
      if (!taskListId) {
        alert('Please select a task list first!');
        return;
      }
      // Route for create a new task
      this.router.navigate(['./new-task'], { relativeTo: this.activateRoute });
    });
    

  }
}
