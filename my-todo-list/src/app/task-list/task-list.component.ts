import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

interface Task {
  title: string;
  description: string;
}
@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    AddTaskModalComponent,
  ],
})
export class TaskListComponent {
  openModal() {
    this.showAddTaskModal = true;
  }
  showAddTaskModal = false;

  oopenModal() {
    this.showAddTaskModal = true;
  }

  onTaskAdded(event: { title: string; description: string }) {
    const newTask = {
      title: event.title,
      description: event.description,
    };

    this.todo.push(newTask);
  }

  deleteTask(index: number) {
    this.todo.splice(index, 1);
  }

  todo: Task[] = [
    {
      title: 'Get to work',
      description: 'Commencer le développement du nouveau projet.',
    },
    {
      title: 'Pick up groceries',
      description: 'Acheter des légumes et des fruits pour la semaine.',
    },
    { title: 'Planifier la réunion hebdomadaire', description: 'Organiser l\'ordre du jour' },
  ];

  inProgress: Task[] = [
    {
      title: 'Rédiger le rapport de projet',
      description: 'Finaliser le premier brouillon du rapport.',
    },
    { title: 'Développer la fonctionnalité X', description: 'Travailler sur l\'implémentation' },
  ];

  done: Task[] = [
    {
      title: 'Répondre aux e-mails',
      description: 'Répondre à tous les e-mails en attente.',
    },
    {
      title: 'Réunion avec le client',
      description: 'Discuter des exigences du projet avec le client.',
    },
  ];

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
  }
}
