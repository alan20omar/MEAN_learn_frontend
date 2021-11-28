import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TaskListModel from '../models/taskList';
import TaskModel from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  API_BASE_URL = 'http://localhost:3000';
  constructor(private httpclient: HttpClient) { }

  // API methods Task Lists
  get( url: string ){
    return this.httpclient.get<TaskListModel[]>(`${this.API_BASE_URL}/${url}`);
  }
  post( url: string, data: Object ){
    return this.httpclient.post<TaskListModel>(`${this.API_BASE_URL}/${url}`, data);
  }
  put( url: string, data: Object ){
    return this.httpclient.put<TaskListModel>(`${this.API_BASE_URL}/${url}`, data);
  }
  patch( url: string, data: Object ){
    return this.httpclient.patch<TaskListModel>(`${this.API_BASE_URL}/${url}`, data);
  }
  delete( url: string ){
    return this.httpclient.delete<TaskListModel>(`${this.API_BASE_URL}/${url}`);
  }

  // Tasks methods
  getTasks(url: string) {
    return this.httpclient.get<TaskModel[]>(`${this.API_BASE_URL}/${url}`);
  }
  postTask(url: string, data: Object) {
    return this.httpclient.post<TaskModel>(`${this.API_BASE_URL}/${url}`, data);
  }
  putTask(url: string, data: Object) {
    return this.httpclient.put<TaskModel>(`${this.API_BASE_URL}/${url}`, data);
  }
  patchTask(url: string, data: Object) {
    return this.httpclient.patch<TaskModel>(`${this.API_BASE_URL}/${url}`, data);
  }
  deleteTask(url: string) {
    return this.httpclient.delete<TaskModel>(`${this.API_BASE_URL}/${url}`);
  }
}
