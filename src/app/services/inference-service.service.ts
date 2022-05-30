import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InferenceServiceService {

  constructor() { }

  requestInference() {
    return 'inference done';
  }
}
