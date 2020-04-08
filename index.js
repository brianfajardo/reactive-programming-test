class Observable {
  constructor() {
    this.callbacks = []
  }

  subscribe(fn) {
    this.callbacks.push(fn)
  }
}

const observable = new Observable()

observable.subscribe((x) => console.log(x))

console.log(observable)
