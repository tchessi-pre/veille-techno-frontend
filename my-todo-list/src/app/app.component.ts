import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { KanbanBoardComponent } from "./kanban-board/kanban-board.component";
import { KanbanHearderComponent } from "./kanban-hearder/kanban-hearder.component";
import { TaskListComponent } from "./task-list/task-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, KanbanBoardComponent, KanbanHearderComponent, TaskListComponent]
})
export class AppComponent {}
