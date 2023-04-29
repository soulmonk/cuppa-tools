import http from 'k6/http'
import {sleep} from 'k6'
// import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

const token = __ENV.TOKEN
const BASE_URL = __ENV.BASE_URL

const reqOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  tags: {name: 'I do not remember what this is for'},
}

export let options = {
  stages: [
    {duration: '1m', target: 1},
  ],
}
// https://k6.io/docs/examples/data-uploads/

const longReportData = open('./data/index.html', 'b')
// const data = JSON.parse(open('./data.json'));
// const fd = new FormData();
// fd.append('someTextField', 'someValue');
//
// const res = http.post('https://httpbin.test.k6.io/post', fd.body(), {
//   headers: { 'Content-Type': 'multipart/form-data; boundary=' + fd.boundary },
// });
// check(res, {
//   'is status 200': (r) => r.status === 200,
// });

const longJson = JSON.parse(open('./data/long.json')) // test when sending large json
const testHtml = '<html><head></head><body><h1 style="color: green">Hello World!</h1></body></html>'

export default function () {
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}`,
      null,
      reqOptions,
    ],
    [
      'POST',
      `${BASE_URL}/raw-data`,
      {data: testHtml},
      reqOptions,
    ],
    [
      'POST',
      `${BASE_URL}/big-json`,
      longJson,
      reqOptions,
    ],
    [
      'POST',
      `${BASE_URL}/form/pdf`,
      longReportData,
      {
        ...reqOptions,
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    ],
  ])
  // const res = http.post('https://example.com/upload', data);
  sleep(3)
}
