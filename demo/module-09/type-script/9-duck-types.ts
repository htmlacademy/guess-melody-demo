class Car {
  id: number;
  numberOfWheels: number;
  move (x: number, y: number) {
    console.log(`move`, {x, y});
  }
}

class Boat {
  id: number;
  move (x: number, y: number) {
    console.log(`move`, {x, y});
  }
}

const car: Car = new Boat(); // ERROR
const boat: Boat = new Car(); // OK
