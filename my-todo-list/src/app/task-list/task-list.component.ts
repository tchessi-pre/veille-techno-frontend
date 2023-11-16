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
  priority: 'basse' | 'moyenne' | 'haute';
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

  onTaskAdded(event: {
    title: string;
    description: string;
    priority: 'basse' | 'moyenne' | 'haute';
  }) {
    const newTask = {
      title: event.title,
      description: event.description,
      priority: event.priority,
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

  loadTasks() {
    const tasksData = this.dataService.getData('tasks');
    if (tasksData) {
      this.todo = tasksData.todo || [];
      this.inProgress = tasksData.inProgress || [];
      this.done = tasksData.done || [];
    }
  }

  getPriorityClass(priority: 'basse' | 'moyenne' | 'haute'): string {
    switch (priority) {
      case 'basse':
        return 'text-green-500'; // Classe pour priorité basse
      case 'moyenne':
        return 'text-yellow-500'; // Classe pour priorité moyenne
      case 'haute':
        return 'text-red-500'; // Classe pour priorité haute
      default:
        return '';
    }
  }
}
