import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.css',
})
export class TaskFilterComponent {
  @Output() filterChanged = new EventEmitter<string>();

  setFilter(filter: string) {
    this.filterChanged.emit(filter);
  }
}
