import {concatMap, of, ReplaySubject, Subject, withLatestFrom} from "rxjs";


// ----- Example-1: withLatestFrom -----
const ex1Base$: Subject<number> = new Subject();
const ex1wlf$: Subject<number> = new Subject();
registerCounterButton("ex1-baseBtn", cnt => `base [${cnt}]`, ex1Base$);
registerCounterButton("ex1-wlfBtn", cnt => `withLatestFrom(Subject) [${cnt}]`, ex1wlf$);
ex1Base$
  .pipe(withLatestFrom(ex1wlf$))
  .subscribe(([ex1Base, ex1wlf]: [number, number]) => write("ex1-out", `${ex1Base}-${ex1wlf}`));

// ----- Example-2: concatMap of withLatestFrom -----
const ex2Base$: Subject<number> = new Subject();
const ex2wlf$: Subject<number> = new Subject();
registerCounterButton("ex2-baseBtn", cnt => `base [${cnt}]`, ex2Base$);
registerCounterButton("ex2-wlfBtn", cnt => `withLatestFrom(Subject) [${cnt}]`, ex2wlf$);
ex2Base$
  .pipe(concatMap(base => of(base).pipe(withLatestFrom(ex2wlf$))))
  .subscribe(([ex2Base, ex2wlf]: [number, number]) => write("ex2-out", `${ex2Base}-${ex2wlf}`));

// ----- Example-3: concatMap of withLatestFrom (ReplaySubject) -----
const ex3Base$: Subject<number> = new Subject();
const ex3wlf$: Subject<number> = new ReplaySubject(1);
registerCounterButton("ex3-baseBtn", cnt => `base [${cnt}]`, ex3Base$);
registerCounterButton("ex3-wlfBtn", cnt => `withLatestFrom(ReplaySubject) [${cnt}]`, ex3wlf$);
ex3Base$
.pipe(concatMap(base => of(base).pipe(withLatestFrom(ex3wlf$))))
.subscribe(([ex3Base, ex3wlf]: [number, number]) => write("ex3-out", `${ex3Base}-${ex3wlf}`));


// ----- helpers -----
function registerCounterButton(id: string, label: (counter: number) => string, targetSubject$: Subject<number>) {
  let counter = 0;
  document
    .getElementById(id)
    .addEventListener("click", event => {
      (event.target as HTMLElement).innerText = label(++counter);
      targetSubject$.next(counter)
    });
  document.getElementById(id).innerText = label(counter);
}

function write(id: string, value: string) {
  document.getElementById(id).innerText = value;
}