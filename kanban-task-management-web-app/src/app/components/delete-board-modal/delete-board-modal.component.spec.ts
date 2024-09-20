import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoardModalComponent } from './delete-board-modal.component';

describe('DeleteBoardModalComponent', () => {
  let component: DeleteBoardModalComponent;
  let fixture: ComponentFixture<DeleteBoardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoardModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
