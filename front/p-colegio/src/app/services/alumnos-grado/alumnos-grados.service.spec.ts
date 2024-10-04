import { TestBed } from '@angular/core/testing';

import { AlumnosGradosService } from '../alumnos-grados.service';

describe('AlumnosGradosService', () => {
  let service: AlumnosGradosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosGradosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
