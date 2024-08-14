# RxJs Examples

Note / TODO: This is an early stage example

## Description
### withLatestFrom(...)
Demonstrates the difference between
```typescript
baseSubject
  .pipe(withLatestFrom(latestFromSubject))
```
and
```typescript
baseSubject
  .pipe(concatMap(base => of(base).pipe(withLatestFrom(latestFromSubject))))
```

## How to Run
* `npm i`
* `npm run build`
* open _dist/index.html_