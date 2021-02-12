import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDetailComponent } from './corporate-detail.component';

describe('CorporateDetailComponent', () => {
  let component: CorporateDetailComponent;
  let fixture: ComponentFixture<CorporateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
