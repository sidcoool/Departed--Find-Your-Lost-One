import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundReportComponent } from './found-report.component';

describe('FoundReportComponent', () => {
  let component: FoundReportComponent;
  let fixture: ComponentFixture<FoundReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
