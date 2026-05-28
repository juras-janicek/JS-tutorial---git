class Car {
    static #totalCars = 0

    constructor(brand, model, year){
        this.brand = brand
        this.model = model
        this.year = year
        Car.#totalCars++;
    }
    static getCount(){
        return `you have ${ElectricCar.#totalCars} car/cars`
    }

    getAge(){
        return `${this.model} is ${2026 - this.year} years old`
    }
}

class ElectricCar extends Car{
    static #totalCars = 0
    #batteryLevel = 100;

    constructor(brand, model, year, batteryRange){
        super(brand, model, year)
        this.batteryRange = batteryRange
        
        ElectricCar.#totalCars++;
    }

    static getCount(){
        return `you have ${ElectricCar.#totalCars} electric car/cars`
    }    

    getBatery(){
        return `${this.model} got ${this.#batteryLevel}km battery level`
    }
    charge(amount){
        if (amount<0){return "you can't charge negative batery level"}
        if (amount + this.#batteryLevel > 100){
            return `you can charge max ${100 - this.#batteryLevel}`
        }
        this.#batteryLevel += amount
        return `battery successfully charged on ${this.#batteryLevel}`
    }
    getBatteryStatus(){
        return `battery status: ${this.#batteryLevel}`
    }
}

const bmw = new Car("BMW", "M3", 1999)
const lotus = new ElectricCar("Lotus", "Evija", 2010, 100)