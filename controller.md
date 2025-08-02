## Controllers

Controllers are responsible for handling incoming requests and sending responses back to the client.

A controller's purpose is to handle specific requests for the application. The routing mechanism determines which controller will handle each request. Often, a controller has multiple routes, and each route can perform a different action.

We use decorator `@Controller()`

### Routing

Using a path prefix in the @Controller() decorator helps us group related routes together and reduces repetitive code. 

```typescript

import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get() // This way, we don't need to repeat that portion of the path for each route in the file.
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

The `@Get()` HTTP request method decorator placed before the `findAll()` method tells Nest to create a handler for a specific endpoint for HTTP requests
We can add to `@Get()` a path, for exemple `@Get('breed')`, the resulting route will be `GET /cats/breed`.

Nest provides decorators for all HTTP methods : `@Post()`, `@Patch()`, `@Delete()`, `@Option()`, ...

### Status code

This method returns a 200 status code.
We can customize it with the decorator `@HttpCode()`

```typescript
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

- To go further on this topic : https://docs.nestjs.com/controllers#status-code

### Request and Response

Handlers often need access to the client’s request details. Nest provides access to the request object from the underlying platform (Express by default). Nest provides `@Req()` decorator :

```typescript
@Get()
findAll(@Req() request: Request): string {
  return 'This action returns all cats';
}
```

The request object represents the HTTP request and contains properties for the query string, parameters, HTTP headers, and body (read more here). 
In most cases, you don't need to manually access these properties. Instead, you can use dedicated decorators like `@Body()`, `@Param()`, `@Body()`, `@Query()`, `@Next()`, `@Session()`, ...

Exemple of use of `@Query()` decorator :

For HTTP request below

```bash
GET /cats?breed=siamoi&color=black
```

```typescript
// We can gather all queries in a object
@Get()
findAll(@Query() query): string {
  return 'This action returns all cats';
}

// Or

// We can get a specific query
@Get()
findAll(@Query('breed') breed, @Query('color') color): string {
  return 'This action returns all cats';
}
```

#### Exemple with Header, rediraction

```typescript
@Post()
@Header('Cache-Control', 'no-store')
create() {
  return 'This action adds a new cat';
}
```

```typescript
@Get()
@Redirect('https://nestjs.com', 301)
```

### Using DTO

```typescript
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

```typescript
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```
