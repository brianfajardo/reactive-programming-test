// Utility functions
const pipe = (...fns) => (initialValue) =>
  fns.reduce((accValue, fn) => fn(accValue), initialValue)

const tap = (fn) => (x) => {
  fn(x)
  return x
}

const mul = (x) => (y) => x * y

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
      acc.subscribe((x) => o.emit(x))
      return o
    }, this)
  }
}

class Mapper {
  constructor(fn) {
    this.observable = new Observable()
    this.fn = fn
  }

  subscribe(callbacks) {
    this.observable.subscribe(callbacks)
  }

  emit(x) {
    this.observable.emit(this.fn(x))
  }
}

const rx = {
  map: (fn) => new Mapper(fn),
}

// Example
const observable = new Observable()
const mutiplyByTen = observable.pipe(rx.map(mul(2)), rx.map(mul(5)))

observable.subscribe(console.log)
mutiplyByTen.subscribe(console.log)

observable.emit(1)
observable.emit(2)
observable.emit(3)

// Prints two streams of data:
// 2 (mutiplyByTen stream)
// 1
// 4 (mutiplyByTen stream)
// 2
// 6 (mutiplyByTen stream)
// 3
