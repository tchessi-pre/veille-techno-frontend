import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css'],
})
export class AddTaskModalComponent {
  taskTitle: string = '';
  taskDescription: string = '';
  showAddTaskModal = false;
  @Input() showModal: boolean = false; // Garder cette propriété
  @Output() taskAdded = new EventEmitter<{
    title: string;
    description: string;
  }>();

  openModal() {
    this.showAddTaskModal = true;
  }
  submitTask(): void {
    if (this.taskTitle.trim()) {
      // Envoyer les données de la tâche au composant parent
      this.taskAdded.emit({
        title: this.taskTitle,
        description: this.taskDescription,
      });
      this.closeModal();
    }
  }

  closeModal(): void {
    this.showModal = false;
  }
}
