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
  taskPriority: 'basse' | 'moyenne' | 'haute' = 'basse';

  @Input() showModal: boolean = false;
  @Output() taskAdded = new EventEmitter<{
    title: string;
    description: string;
    priority: 'basse' | 'moyenne' | 'haute';
  }>();

  openModal() {
    this.showModal = true;
  }

  submitTask(): void {
    if (this.taskTitle.trim() || this.taskDescription.trim()) {
      // Envoyer les données de la tâche au composant parent
      this.taskAdded.emit({
        title: this.taskTitle,
        description: this.taskDescription,
        priority: this.taskPriority,
      });
      this.closeModal();
    }
  }

  closeModal(): void {
    this.showModal = false;
    // Réinitialiser les champs du formulaire ici, si nécessaire
    this.taskTitle = '';
    this.taskDescription = '';
  }
}
