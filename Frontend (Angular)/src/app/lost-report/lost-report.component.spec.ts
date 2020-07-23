import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostReportComponent } from './lost-report.component';

describe('LostReportComponent', () => {
  let component: LostReportComponent;
  let fixture: ComponentFixture<LostReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
