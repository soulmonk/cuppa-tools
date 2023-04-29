import http from 'k6/http'
import {sleep} from 'k6'

// https://k6.io/docs/using-k6/k6-options/reference/
export let options = {
  stages: [
    {duration: '2m', target: 100}, // below normal load
    {duration: '5m', target: 100},
    {duration: '2m', target: 200}, // normal load
    {duration: '5m', target: 200},
    {duration: '2m', target: 300}, // around the breaking point
    {duration: '5m', target: 300},
    {duration: '2m', target: 400}, // beyond the breaking point
    {duration: '5m', target: 400},
    {duration: '10m', target: 0}, // scale down. Recovery stage.
  ],
};

const url = __ENV.URL;

export default function () {
  // batch requests for 1 user
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/api/users`,
      null,
      reqOptions,
    ],
  ]);

  sleep(randomIntBetween(0.1, 1));
}
