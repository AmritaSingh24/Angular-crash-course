import { Injectable } from '@angular/core';
import { Task } from '../task';
import { Observable, of } from 'rxjs';
import { TASKS } from '../mock-tasks';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTask(): Observable<Task[]> {
    const tasks = of(TASKS);
    return tasks;
  }
}
