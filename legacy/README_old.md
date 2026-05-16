# JC mall - Local Setup

This project uses Docker to provide a local development environment.

## Requirements
- Docker Desktop
- macOS / Windows / Linux

## How to Start the Application
To start the web server and database, run:
```bash
docker-compose up -d
```

## Accessing the Site
The site is hosted on port **8001**.
- **Homepage**: [http://localhost:8001/jcmall/](http://localhost:8001/jcmall/)
- **Admin Dashboard**: [http://localhost:8001/jcmall/admin/](http://localhost:8001/jcmall/admin/)
  - Username: `admin`
  - Password: `admin`

## Database Details
- The database is initialized automatically by `setup.php` (if not already set up).
- **Host**: `db` (internal Docker network)
- **Database Name**: `mall`
- **Username**: `root`
- **Password**: `(empty)`

## Stopping the Application
To stop the services, run:
```bash
docker-compose down
```
