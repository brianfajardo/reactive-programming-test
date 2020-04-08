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
}
const pipe = (f, g) => (x) => g(f(x))

const tap = (fn) => (x) => {
  fn(x)
  return x
}

const double = (x) => x * 2

const observable = new Observable()

observable.subscribe(pipe(tap(double), tap(console.log)))

observable.emit(1)
observable.emit(2)
observable.emit(3)
observable.emit(4)
observable.emit(5)
