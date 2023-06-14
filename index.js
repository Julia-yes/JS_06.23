class Stack {
  constructor(num) {
    if (num) {
      if (typeof num !== "number" || !Number.isFinite(num) || num <= 0) {
        throw new Error("Invalid limit value");
      }
      if (!Number.isInteger(num)) {
        num = Math.round(num);
      }
    }
    this.limit = num ? num : 10;
    this.size = 0;
    this.stack = {};
  }
  push(elem) {
    if (this.size < this.limit) {
      this.stack[this.size] = elem;
      this.size++;
    } else {
      throw new Error("Limit exceeded");
    }
  }
  pop() {
    if (this.size === 0) {
      throw new Error("Empty stack");
    } else {
      const deletedElem = this.stack[this.size - 1];
      delete this.stack[this.size - 1];
      this.size--;
      return deletedElem;
    }
  }
  peek() {
    if (this.size === 0) {
      return null;
    } else {
      return this.stack[this.size - 1];
    }
  }
  isEmpty() {
    if (this.size === 0) {
      return true;
    } else {
      return false;
    }
  }
  toArray() {
    if (this.size === 0) {
      return [];
    } else {
      return Object.values(this.stack);
    }
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] === "function") {
      const newStack = new Stack(iterable.length);
      for (let item of iterable) {
        newStack.push(item);
      }
      return newStack;
    } else {
      throw new Error("Not iterable");
    }
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  createItem(value, next) {
    const obj = { value, next: next ? next : null };
    return obj;
  }
  append(elem) {
    const newElem = this.createItem(elem);
    if (!this.head || !this.tail) {
      this.head = newElem;
      this.tail = newElem;
    } else {
      this.tail.next = newElem;
      this.tail = newElem;
    }
  }
  prepend(elem) {
    const newElem = this.createItem(elem, this.head ? this.head : null);
    this.head = newElem;
    if (!this.tail) {
      this.tail = newElem;
    }
  }
  find(value) {
    if (!this.head) {
      return null;
    }
    let filteredElem = this.head;
    while (filteredElem) {
      if (filteredElem.value === value) {
        return filteredElem;
      }
      filteredElem = filteredElem.next;
    }

    return null;
  }
  toArray() {
    if (!this.head) {
      return [];
    } else {
      const newArr = [];
      let filteredElem = this.head;
      while (filteredElem) {
        newArr.push(filteredElem.value);
        filteredElem = filteredElem.next;
      }
      return newArr;
    }
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] === "function") {
      const newList = new LinkedList();
      for (let item of iterable) {
        newList.append(item);
      }
      return newList;
    } else {
      throw new Error("Not iterable");
    }
  }
}

class Car {
  #brand = "";
  set brand(string) {
    if (typeof string === "string" && string.length && string.length <= 50) {
      this.#brand = string;
    } else {
      throw new Error("Invalid brand name");
    }
  }
  get brand() {
    return this.#brand;
  }
  #model = "";
  set model(string) {
    if (typeof string === "string" && string.length && string.length <= 50) {
      this.#model = string;
    } else {
      throw new Error("Invalid model name");
    }
  }
  get model() {
    return this.#model;
  }
  #yearOfManufacturing = 1950;
  set yearOfManufacturing(year) {
    if (
      typeof year !== "number" ||
      !Number.isFinite(year) ||
      !Number.isInteger(year) ||
      year < 1950 ||
      year > 2023
    ) {
      throw new Error("Invalid year of manufacturing");
    } else {
      this.#yearOfManufacturing = year;
    }
  }
  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }
  #maxSpeed = 100;
  set maxSpeed(speed) {
    if (
      typeof speed !== "number" ||
      !Number.isFinite(speed) ||
      !Number.isInteger(speed) ||
      speed < 100 ||
      speed > 330
    ) {
      throw new Error("Invalid max speed");
    } else {
      this.#maxSpeed = speed;
    }
  }
  get maxSpeed() {
    return this.#maxSpeed;
  }
  #maxFuelVolume = 20;
  set maxFuelVolume(fuel) {
    if (
      typeof fuel !== "number" ||
      !Number.isFinite(fuel) ||
      !Number.isInteger(fuel) ||
      fuel < 20 ||
      fuel > 100
    ) {
      throw new Error("Invalid max fuel volume");
    } else {
      this.#maxFuelVolume = fuel;
    }
  }
  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }
  #fuelConsumption = 1;
  set fuelConsumption(fuel) {
    if (
      typeof fuel !== "number" ||
      !Number.isFinite(fuel) ||
      !Number.isInteger(fuel) ||
      fuel <= 0
    ) {
      throw new Error("Invalid fuel consumption");
    } else {
      this.#fuelConsumption = fuel;
    }
  }
  get fuelConsumption() {
    return this.#fuelConsumption;
  }
  #damage = 1;
  set damage(value) {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      !Number.isInteger(value) ||
      value < 1 ||
      value > 5
    ) {
      throw new Error("Invalid damage");
    } else {
      this.#damage = value;
    }
  }
  get damage() {
    return this.#damage;
  }
  #currentFuelVolume = 0;
  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }
  #isStarted = false;
  get isStarted() {
    return this.#isStarted;
  }
  #mileage = 0;
  get mileage() {
    return this.#mileage;
  }
  #health = 100;
  get health() {
    return this.#health;
  }

  start() {
    if (this.#isStarted) {
      throw new Error("Car has already started");
    } else {
      this.#isStarted = true;
    }
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error("Car hasn't started yet");
    } else {
      this.#isStarted = false;
    }
  }

  fillUpGasTank(fuel) {
    if (
      typeof fuel !== "number" ||
      !Number.isFinite(fuel) ||
      !Number.isInteger(fuel) ||
      fuel <= 0
    ) {
      throw new Error("Invalid fuel amount");
    } else {
      if (fuel + this.#currentFuelVolume > this.#maxFuelVolume) {
        throw new Error("Too much fuel");
      }
      if (this.#isStarted) {
        throw new Error("You have to shut down your car first");
      } else {
        this.#currentFuelVolume = this.#currentFuelVolume + fuel;
      }
    }
  }
  drive(speed, duration) {
    if (
      typeof speed !== "number" ||
      !Number.isFinite(speed) ||
      !Number.isInteger(speed) ||
      speed <= 0
    ) {
      throw new Error("Invalid speed");
    }
    if (
      typeof duration !== "number" ||
      !Number.isFinite(duration) ||
      !Number.isInteger(duration) ||
      duration <= 0
    ) {
      throw new Error("Invalid duration");
    }
    if (speed > this.#maxSpeed) {
      throw new Error("Car can't go this fast");
    }
    if (!this.#isStarted) {
      throw new Error("You have to start your car first");
    }
    if ((speed * duration * this.#fuelConsumption) / 100 > this.#currentFuelVolume) {
      throw new Error("You don't have enough fuel");
    }
    if ((speed * duration * this.#damage) / 100 > this.#health) {
      throw new Error("Your car won’t make it");
    }
    this.#currentFuelVolume =
      this.#currentFuelVolume - (speed * duration) / this.#fuelConsumption / 100;
    this.#health = this.#health - (speed * duration * this.#damage) / 100;
    this.#mileage = this.#mileage + speed * duration;
  }
  repair() {
    if (this.#isStarted) {
      throw new Error("You have to shut down your car first");
    }
    if (this.#currentFuelVolume < this.#maxFuelVolume) {
      throw new Error("You have to fill up your gas tank first");
    }
    this.#health = 100;
  }
  getFullAmount() {
    return this.#maxFuelVolume - this.#currentFuelVolume;
  }
}
