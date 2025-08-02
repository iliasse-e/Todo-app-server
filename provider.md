## Provider Custom

This declaration :

```typescript
providers: [DogService],
```
Is actually this :

```typescript
  providers: [{
   provide: DogService,
   useClass: DogService
  }],
```

We use `useClass` to provide a class, but if we don't want to provide a class, we would use `useValue`.


```typescript
  providers: [{
   provide: 'TAIL',
   useValue: tail
  }],
```

We use `@Inject()`, because we did not use the `@Injectable()` decorator.

```typescript
constructor(@Inject('TAIL') tail: Tail) {}
```

#### useClass

If we want to provide a class, that isn't holding `@Injectable()` decorator, we need to use that property.

```typescript
  providers: [{
   provide: DatabasConnection,
   useClass: DatabasConnection // This class has not @Injectable decorator
  }],
```

#### useFactory

In order to create dynamic provider.

```typescript
const config = {
 provide: 'CONFIG',
 useFactory: () => {
   return process.env.NODE_ENV === 'dev' ? devConfig : prodConfig
 }
}
```

### Export custom provider

```typescript
@Module({
  controllers: [DogController],
  providers: [{
   provide: 'TAIL',
   useValue: tail
  }, DogService],
  exports: [DogService, 'TAIL'],
})
export class DogModule {}
```

### Circular dependency

- Use `forwarRef()` in the class scope

- Use `forwardRef()` in the provider scope

- Use `moduleRef()` in the module scope

