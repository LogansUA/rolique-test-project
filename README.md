# Test project for Rolique

## Prerequisites

* Yarn installed globally
* Git installed
* Docker installed
* Node >= v8.0.0

## Installation

* Configure hosts and ports for each container in `docket-compose.yaml` file, in section environment
* Install dependencies
* Build docker containers

```bash
$ docker-compose build
```

* Start databases

```
$ docker-compose up -d --no-deps --build db_mongo_books db_mongo_users
```

* Run the install command

```
$ ./install.sh
```

* Start the other docker containers

```
$ ./start.sh
```

## Usage

The entry point of whole system is the `entrypoint` container, by default it's running on `http://localhost:80` (base path `/api`) url.
Static files is served by `entrypoint` container, by default there are two paths `/documents` (url: `http://localhost:80/documents`) and `/images` (url: `http://localhost:80/images`)
