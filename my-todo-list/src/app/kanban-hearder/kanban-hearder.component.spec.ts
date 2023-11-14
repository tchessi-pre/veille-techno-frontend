import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanHearderComponent } from './kanban-hearder.component';

describe('KanbanHearderComponent', () => {
  let component: KanbanHearderComponent;
  let fixture: ComponentFixture<KanbanHearderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanHearderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanbanHearderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
