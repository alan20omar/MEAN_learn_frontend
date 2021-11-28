import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import TaskModel from '../models/task';
import TaskListModel from '../models/taskList';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfService: ApiConfigService) { }

  // Fetch all task lists 
  getAllTaskLists(): Observable<TaskListModel[]>{
    return this.apiConfService.get('tasklists');
  }
  
  // Create a new task list
  createTaskList(title: string): Observable<TaskListModel>{
    let data = {"title": title};
    return this.apiConfService.post('tasklists', data);
  }

  // Fetch all tasks of a task list
  getAllTasks(idTaskList: string): Observable<TaskModel[]>{
    return this.apiConfService.getTasks(`tasklists/${idTaskList}/tasks`);
  }

  // Create a new task with a particular task list
  createTask(idTaskList: string, title: string, completed: boolean = false): Observable<TaskModel>{
    let data = {
      "title": title,
      "completed": completed
    };
    return this.apiConfService.postTask(`tasklists/${idTaskList}/tasks`, data);
  }

  // Delete a task list
  deleteTaskList(taskListObject: TaskListModel): Observable<TaskListModel>{
    return this.apiConfService.delete(`tasklists/${taskListObject._id}`);
  }

  // Delete a task
  deleteTask(taskObject: TaskModel): Observable<TaskModel>{
    return this.apiConfService.deleteTask(`tasklists/${taskObject._taskListId}/tasks/${taskObject._id}`);
  }

  // Update the status of a task
  updateTaskStatus(taskObject: TaskModel): Observable<TaskModel>{
    let updateData = { "completed": !taskObject.completed };
    return this.apiConfService.patchTask(`tasklists/${taskObject._taskListId}/tasks/${taskObject._id}`, updateData)
    // let subject = new Subject<TaskModel>();
    // this.apiConfService.getTasks(`tasklists/${taskObject._taskListId}/tasks/${taskObject._id}`).subscribe((data: TaskModel[]) => {
    //   taskObject = data[0]
    //   let updateData = { "completed": !taskObject.completed};
    //   this.apiConfService.patchTask(`tasklists/${taskObject._taskListId}/tasks/${taskObject._id}`, updateData).subscribe((data: TaskModel) => {
    //     subject.next(data);
    //   });
    // });
    // return subject.asObservable();
  }
}
