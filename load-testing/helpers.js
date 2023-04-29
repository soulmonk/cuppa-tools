import {randomIntBetween} from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export function generateData(id) {
  return {
    id,
    name: 'name #' + randomIntBetween(1, 100000),
  }
}
