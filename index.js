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
  }
}

// Example
const observable1 = new Observable()
const observable2 = new Observable()
const observable3 = new Observable()

observable1.pipe(observable2)
observable1.pipe(observable3)

observable1.subscribe(console.log)
observable2.subscribe(console.log)
observable3.subscribe(console.log)

observable1.emit(1)
observable1.emit(2)
observable1.emit(3)

// Prints three streams:
// 1
// 1
// 1
// 2
// 2
// 2
// 3
// 3
// 3
