// k6 run -d 1m -u 10 -i 10 load-testing/using-check.js
import http from 'k6/http';
import {check, sleep} from 'k6';

const token = __ENV.TOKEN;
const url = __ENV.URL;
export default function () {
  const res = http.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  check(res, {
    'status is 200': (r) => r.status === 200,
    'status is 403': (r) => r.status === 403,
    'status is 500': (r) => r.status === 500,
    'status is 429': (r) => r.status === 429,
    'status is 401': (r) => r.status === 401,
    'status gte 200 and lt 300': (r) => r.status > 200 && r.status < 300,
    'status gte 300 and lt 400': (r) => r.status > 300 && r.status < 400,
    'status gte 400 and lt 500': (r) => r.status > 400 && r.status < 500,
    'status gte 500': (r) => r.status >= 500,
  });
  sleep(0.5);
}
