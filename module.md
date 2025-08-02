## Modules

### Feature modules

As Angular, we can achitect our folder structure by features.

```bash
src/
├── cats/
│   ├── dto/
│   │   └── create-cat.dto.ts/        
│   ├── interfaces/ 
│   │   └── cat.interface.ts/
│   ├── cats.controller.ts/     
│   ├── cats.service.ts/
│   └── cats.module.ts/
├── app.module.ts/
└── main.ts
```

*Here we represent the feature cats*

### Module properties

`imports` Modules to import

`providers` Everything that in injectable

`controllers`

`exports` The subset of providers that are provided by this module and should be available in other modules which import this module

### Shared modules

In Nest, modules are singletons by default, and thus you can share the same instance of any provider between multiple modules effortlessly.


### Global modules

If you have to import the same set of modules everywhere, it can get tedious. Unlike in Nest, Angular providers are registered in the global scope. Once defined, they're available everywhere. Nest, however, encapsulates providers inside the module scope. You aren't able to use a module's providers elsewhere without first importing the encapsulating module.

When you want to provide a set of providers which should be available everywhere out-of-the-box (e.g., helpers, database connections, etc.), make the module global with the @Global() decorator.

`@Global()` decorator makes the module global-scoped.

```typescript
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

Here, `CatsService` can be injected anywhere, with no need to import `CatsModule`.

### Module re-exporting

```typescript
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```
### Dynamic modules

#### `register()`

This method allow to create a dynamic module with a specific configuration that is gonna to be in the module where it is called.

Let's create a dynamic module.

```typescript
@Module({}) // we empty this line
export class ConfigModule {
  static register(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}

// We work it out to be that :

@Module({})
export class ConfigModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
```

Let's use it here :

```typescript
@Module({
  imports: [
    BirdModule,
    DogModule,
    ConfigModule.register({
      folder: './config',
    }),
  ],
  controllers: [AppController, DogController],
  providers: [AppService, DogService],
})
export class AppModule {}
```

#### `forRoot()`

Same as `register()` but the configuration could be used in other places.

#### `forFeature()`

Similar to some points to `forRoot()`.

