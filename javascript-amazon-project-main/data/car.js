class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  topSpeed = 200;
  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  }
  getBrand() {
    return this.#brand;
  }
  getModel() {
    return this.#model;
  }

  displayInfo() {
    return `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Is trunk open: ${this.isTrunkOpen}`;
  }

  go() {
    if (this.speed >= 0 && this.topSpeed) {
      this.speed += 5
    } else {
      return;
    }
  }
  brake() {
    if (this.speed >= 5) {
      this.speed -= 5
    } else {
      return;
    }
  }
  openTrunk() {
    if (this.speed === 0 && this.isTrunkOpen === false) {
      this.isTrunkOpen = true;
    } else {
      return;
    }
  }
  closeTrunk() {
    if (this.speed === 0 && this.isTrunkOpen === true) {
      this.isTrunkOpen = false;
    } else {
      return;
    }
  }
}



const car1 = new Car('Tesla', 'Model 3');
const car2 = new Car('Toyota,', 'Corolla');

car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car2.brake();
car1.openTrunk();
car2.openTrunk();
console.log(car1.displayInfo());
console.log(car2.displayInfo());

class RaceCar extends Car {
  constructor(brand, model, prop3) {
    super(brand, model);
    this.topSpeed = 300;
    this.acceleration = prop3;
  }
  go() { 
  if (this.speed >= 0 && this.speed <= this.topSpeed - this.acceleration) {
    this.speed += this.acceleration;
  } else {
    return;
  }
}
displayInfo() {
  return `${this.getBrand()} ${this.getModel()}, Speed: ${this.speed} km/h`;
}
}

const car3 = new RaceCar('McLaren', 'F1', 20);
car3.go();
car3.model = 'something'
console.log(car3.displayInfo());
