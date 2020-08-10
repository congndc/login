import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterConfigurationComponent } from './semester-configuration.component';

describe('SemesterConfigurationComponent', () => {
  let component: SemesterConfigurationComponent;
  let fixture: ComponentFixture<SemesterConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
