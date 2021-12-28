import { TestBed } from '@angular/core/testing';

import { ContactAuthService } from './contact-auth.service';

describe('ContactAuthService', () => {
  let service: ContactAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
