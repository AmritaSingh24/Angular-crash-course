import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  taskForm! : FormGroup;
  showAddTask: boolean = false;
  subscription!:Subscription;

  constructor( 
    private fb : FormBuilder,
    private uiService: UiService
  ) { 
    this.subscription = this.uiService.onToggle().subscribe(
      (value) => (this.showAddTask = value)
    )
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.taskForm = this.fb.group({
      task: ['', Validators.required],
      day: ['', Validators.required],
      reminder: [false, Validators.required]
    })
  }

  onSubmit(){
    const newTask = {
      text : this.taskForm.value.task,
      day: this.taskForm.value.day,
      reminder: this.taskForm.value.reminder
    }
    
    this.onAddTask.emit(newTask)

    this.taskForm.reset();
  }
}
