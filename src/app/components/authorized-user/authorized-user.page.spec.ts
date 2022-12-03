import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedUserPage } from './authorized-user.page';

describe('AuthorizedUserPage', () => {
  let component: AuthorizedUserPage;
  let fixture: ComponentFixture<AuthorizedUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizedUserPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
