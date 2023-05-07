// export data to prometeus
// https://k6.io/docs/results-output/real-time/grafana-cloud/
export const options = {
  ext: {
    loadimpact: {
      projectID: 3538155,
      name: 'load-testing',
      distribution: {
        'amazon:us:ashburn': {loadZone: 'amazon:us:ashburn', percent: 100},
      }
    }
  }
}
export default function () {
  throw new Error('Not implemented');
}
