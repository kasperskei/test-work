export default class EventObserver {
  constructor() {
    this.observers = new Set()
  }

  subscribe(callback) {
    this.observers.add(callback)
  }

  unsubscribe(callback) {
    this.observers.delete(callback)
  }

  broadcast(data) {
    this.observers.forEach((subscriber) => subscriber(data))
  }
}
