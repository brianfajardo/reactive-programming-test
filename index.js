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

  pipe(observable) {
    this.subscribe((x) => observable.emit(x))
    return observable
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

// Example
const observable = new Observable()
const doubler = observable.pipe(new Mapper((x) => x * 2))

observable.subscribe(console.log)
doubler.subscribe(console.log)

observable.emit(1)
observable.emit(2)
observable.emit(3)

// Prints two streams of data:
// 2 (doubler stream)
// 1
// 4 (doubler stream)
// 2
// 6 (doubler stream)
// 3
