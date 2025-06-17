import { TestBed } from '@angular/core/testing';

import { authGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(authGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
