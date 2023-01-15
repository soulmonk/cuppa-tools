# cuppa-tools

## Docker

### Helper
- `export $(cat .env | xargs)`

### local
- `docker build -t cuppa-${SERVICE_NAME} .` - for local
- `docker run -d --name cuppa-${SERVICE_NAME} -p ${PORT}:${PORT} -e PORT=${PORT} cuppa-${SERVICE_NAME}` - for local

### for raspberry pi

- `docker build -t cuppa/${SERVICE_NAME}:v${VERSION} --platform linux/arm64 .`
- `docker tag cuppa/${SERVICE_NAME}:v${VERSION} rpisoulv1.kube:31320/cuppa/${SERVICE_NAME}:v${VERSION}`
- `docker push rpisoulv1.kube:31320/cuppa/${SERVICE_NAME}:v${VERSION}`


### Registry

- http://rpisoulv1.kube:31320/v2/_catalog
- http://rpisoulv1.kube:31320/v2/cuppa/auth/tags/list


## Init db

connect via psql

```
psql "postgres://postgres:password@localhost/"
```

```
CREATE USER "cuppa" NOSUPERUSER;
ALTER USER "cuppa" WITH PASSWORD 'toor';
CREATE DATABASE "cuppa-authentication" WITH OWNER 'cuppa';
```


## Docker compose

Init external resources
```bash
docker network create cuppa-network
docker volume create cuppa-postgres-data
docker volume create cuppa-mongo-data
```

```bash
docker-compose -p cuppa-base -f deployment/base.docker-compose.yml up -d --remove-orphans
```

Do not forget run migration and setup db [postgres-setup.sql](scripts%2Fpostgres-setup.sql)
