import http from 'k6/http'
import {check, sleep} from 'k6'
// import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {generateData} from './helpers.js';

const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  const res = http.post(`${baseUrl}/post`, JSON.stringify(generateData()), reqOptions);
  const responseData = res.json();
  const id = responseData.id
  check(res, {
    'created': (r) => r.status === 200,
    'failed-create': (r) => r.status !== 200
  })

  // update only 50% of the time
  if (Math.random() < 0.5) {
    const res = http.put(`${baseUrl}/put`, JSON.stringify(generateData(id)), reqOptions);

    check(res, {
      'updated': (r) => r.status === 200,
      'failed-update': (r) => r.status !== 200
    })
  }

  sleep(0.5);
}
