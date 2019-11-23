import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateclassPage } from './createclass.page';

describe('CreateclassPage', () => {
  let component: CreateclassPage;
  let fixture: ComponentFixture<CreateclassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateclassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateclassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
