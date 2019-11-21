import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistergamesPage } from './registergames.page';

describe('RegistergamesPage', () => {
  let component: RegistergamesPage;
  let fixture: ComponentFixture<RegistergamesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistergamesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistergamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
