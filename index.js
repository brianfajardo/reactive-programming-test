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

const observable = new Observable()

const pipe = (f, g) => (x) => g(f(x))

const double = (x) => x * 2

observable.subscribe(pipe(double, console.log))

observable.emit(1)
observable.emit(2)
observable.emit(3)
observable.emit(4)
observable.emit(5)
