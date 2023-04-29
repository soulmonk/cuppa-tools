# Load testing using k6

[K6 documentation](https://k6.io/docs/)

## Running the tests

```bash
k6 run -d 1m -u 10 -e TOKEN="$TOKEN" -e URL="http://localhost:3000" using-check.js
```

- `-d` duration of the test 1m = 1 minute
- `-u` number of virtual users

```bash
k6 run -d 10s -u 1 -e BASE_URL="https://httpbin.test.k6.io" post.js
```

- `-d` duration of the test 10s = 10 seconds
