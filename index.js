// Utility functions
const pipe = (...fns) => (initialValue) =>
  fns.reduce((accValue, fn) => fn(accValue), initialValue)

const tap = (fn) => (x) => {
  fn(x)
  return x
}

const multiplyBy = (x) => (y) => x * y

// Reactive library
class Observable {
  constructor() {
    this.callbacks = []
  }

  subscribe(fn) {
    this.callbacks.push(fn)
  }

  emit(x) {
    this.callbacks.map((fn) => fn(x))
  }

  pipe(...observables) {
    return observables.reduce((acc, o) => {
      acc.subscribe(o.emit.bind(o))
      return o
    }, this)
  }
}

class Mapper {
  constructor(fn) {
    this.observable = new Observable()
    this.fn = fn
  }

  subscribe(callback) {
    this.observable.subscribe(callback)
  }

  emit(x) {
    this.observable.emit(this.fn(x))
  }
}

class Filter {
  constructor(predicate) {
    this.observable = new Observable()
    this.predicate = predicate
  }

  subscribe(callback) {
    this.observable.subscribe(callback)
  }

  emit(x) {
    if (this.predicate(x)) {
      this.observable.emit(x)
    }
  }
}

const rx = {
  map: (fn) => new Mapper(fn),
  filter: (predicate) => new Filter(predicate),
}

// Example
const myObservable = new Observable()

myObservable
  .pipe(
    rx.map(multiplyBy(10)),
    rx.filter((x) => x >= 30)
  )
  .subscribe(console.log)

myObservable.emit(1)
myObservable.emit(2)
myObservable.emit(3)
myObservable.emit(4)
myObservable.emit(5)

// Prints one stream of data:
// 30
// 40
// 50
