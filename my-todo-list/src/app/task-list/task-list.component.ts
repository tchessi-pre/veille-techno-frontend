import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { DataService } from '../data.service';

interface Task {
  title: string;
  description: string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, AddTaskModalComponent, DragDropModule],
})
export class TaskListComponent implements OnInit {
  clearDoneTasks() {
    this.done = [];
    this.saveTasks();
  }
  showAddTaskModal = false;
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadTasks();
  }

  openModal() {
    this.showAddTaskModal = true;
  }

  onTaskAdded(event: { title: string; description: string }) {
    const newTask = {
      title: event.title,
      description: event.description,
    };
    this.todo.push(newTask);
    this.saveTasks();
  }

  deleteTask(index: number, list: 'todo' | 'inProgress' | 'done') {
    this[list].splice(index, 1);
    this.saveTasks();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.saveTasks();
  }

  saveTasks() {
    const tasksData = {
      todo: this.todo,
      inProgress: this.inProgress,
      done: this.done,
    };
    this.dataService.saveData('tasks', tasksData);
  }

  private loadTasks() {
    const tasksData = JSON.parse(localStorage.getItem('tasks') || '{}');
    this.todo = tasksData.todo || [];
    this.inProgress = tasksData.inProgress || [];
    this.done = tasksData.done || [];
  }
}
