import { TestBed } from '@angular/core/testing';

import { ContactAcessService } from './contact-acess.service';

describe('ContactAcessService', () => {
  let service: ContactAcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactAcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
