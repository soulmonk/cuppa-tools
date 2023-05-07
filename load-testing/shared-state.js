import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import http from 'k6/http'
import exec from 'k6/execution';
import { SharedArray } from 'k6/data';
import { sleep } from 'k6';

const url = __ENV.URL || 'http://localhost:3000/';

// readonly shared between VUs
const data = new SharedArray('data', function () {
  const dataArray = [];
  // more operations
  return dataArray; // must be an array
})

export function setup() {
  const vus = exec.instance.vusInitialized || 1;
  const users = [];
  for (let i = 0; i < vus; i++) {
    const userId = uuidv4();
    users.push({
      userId,
      headers:{
        'Content-Type': 'application/json',
        'X-User-Id': userId,
        Authorization: `Bearer ${userId}`,
      },
    });
  }
  return users;
}

export default function (users) {
  // data copied to each VU, and can be modified per VU, no intersection between VUs
  const userId = exec.vu.idInTest - 1;
  users[userId].newField = 'available between iterations ' + exec.vu.iterationInScenario;
  console.log(exec.vu.iterationInInstance);
  const res = http.get(url, {
    headers: users[userId].headers
  });
  sleep(0.4);
}

export function teardown(data) {
  const userId = Object.keys(data)[0];
  // no such field `typeof data[userId].newField === 'undefined'`
  // original data from setup(), not by default function.
}
