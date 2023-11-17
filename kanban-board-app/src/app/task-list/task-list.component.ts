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
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { KanbanHearderComponent } from "../kanban-hearder/kanban-hearder.component";

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
    imports: [
        CommonModule,
        AddTaskModalComponent,
        DragDropModule,
        TaskFilterComponent,
        KanbanHearderComponent
    ]
})
export class TaskListComponent implements OnInit {
  currentFilter: string | undefined;
  filteredTasks: Task[] = [];
  showAddTaskModal = false;
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  filteredTodo: Task[] = [];
  filteredInProgress: Task[] = [];
  filteredDone: Task[] = [];
  showModal: any;

  constructor(private dataService: DataService) {}

  clearDoneTasks() {
    this.done = [];
    this.saveTasks();
  }

  ngOnInit() {
    this.loadTasks();
    this.updateFilteredTasks();
  }

  openModal() {
    this.showAddTaskModal = true;
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    this.updateFilteredTasks();
  }

  updateFilteredTasks() {
    this.filteredTodo = this.filterTasks(this.todo);
    this.filteredInProgress = this.filterTasks(this.inProgress);
    this.filteredDone = this.filterTasks(this.done);
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
        return 'bg-priority-basse';
      case 'moyenne':
        return 'bg-priority-moyenne';
      case 'haute':
        return 'bg-priority-haute';
      default:
        return '';
    }
  }

  private filterTasks(taskList: Task[]): Task[] {
    if (!this.currentFilter || this.currentFilter === 'all') {
      return taskList;
    } else {
      return taskList.filter((task) => task.priority === this.currentFilter);
    }
  }
}
