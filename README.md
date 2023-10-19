# Paynetics task description

## Used technologies
- Docker
- Docker compose
- Symfony 6.3
- Doctrine 2.16
- Api platform 3.2
- Bootstrap 5
- StofDoctrineExtensions plugin

## Details
- All endpoints are generated via Api platform annotations in entities **Task** and **Project**.
- Validation of fields are again annotated in entities using **Assert**
- Updating project duration (Deadline) `DateTime` is depending on duration of added/modified task. `ResponseListener`
- Again in same file is implemented custom response as is described in task description
- Soft delete is added via Symfony plugin [StofDoctrineExtensions](https://github.com/stof/StofDoctrineExtensionsBundle)
- Pagination is again achieved via Api platform and is change to 10 items per page
- There is dedicated URL `/api` where Swagger documentation present all endpoints
- Implemented FE interface which hits endpoints and get/update/create/delete entities data

## Remaining 
- Add new fields for Companies and Clients
- Finish Docker configuration 
  - add npm inside container to execute webpack encore
  - running migration when is deployed
- Finish Swagger documentation
- Polish FE part