import { EventEmitter } from "events";

class DomClass extends EventEmitter {
  addEventListener(eventname, callback) {
    this.on(eventname, callback);
  }
  removeEventListener(eventname, callback) {
    this.off(eventname, callback);
  }

  dispatchEvent(eventName, eventData = {}) {
    const event = {
      type: eventName,
      timespam: new Date(),
      ...eventData,
    };
    this.emit(eventName, event);
  }
}

const button = new DomClass();
const handleclick = (event) => {
  console.log(`Button clicked type: ${event.type} at ${event.timespam}`);
};

button.addEventListener("click", handleclick);
button.dispatchEvent("click", {
  target: "submitBtn",
});

button.removeEventListener("click", handleclick);
button.dispatchEvent("click", {
  target: "resetBtn",
});
