import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowListComponent } from './now-list.component';

describe('NowListComponent', () => {
  let component: NowListComponent;
  let fixture: ComponentFixture<NowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
