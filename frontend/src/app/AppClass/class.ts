export const any_skill: string = "ANY";

export class GetClass {
    private _id: number;
    private _game_type_id: number;
    private _name: string;
    private _student_count: number;
    private _created_by: number;
    private _created_on: Date;
    private _cost: number;
    private _address: Address;
    private _instructor_id: number;
    private _hasJoined: boolean;
    private _spots_taken: number;

    constructor(id: number = 0,
                game_type_id: number = 0,
                name: string = '',
                student_count: number = 0,
                created_by: number = 0,
                created_on: Date = new Date(),
                cost: number = 0,
                instructor_id: number = 0,
                hasJoined: boolean = false
    ) {
        this._id = id;
        this._game_type_id = game_type_id;
        this._name = name;
        this._student_count = student_count;
        this._created_by = created_by;
        this._created_on = created_on;
        this._cost = cost;
        this._instructor_id = instructor_id;
        this._hasJoined = hasJoined;
    }

    get name(): string {
        return this._name;
    }

    get student_count(): number {
        return this._student_count;
    }

    get address(): Address {
        return this._address;
    }

    get cost(): number {
        return this._cost;
    }

    get spots_taken(): number{
        return this._spots_taken;
    }

    get id(): number {
        return this._id;
    }

    get instructor_id(): number {
        return this._instructor_id;
    }

    get game_type_id(): number {
        return this._game_type_id;
    }

    get hasJoined(): boolean{
        return this._hasJoined;
    }

    map(data) {
        this._id = data.class_id;
        this._game_type_id = data.game_type_id;
        this._name = data.class_name.toUpperCase();
        this._student_count = data.student_count;
        this._cost = data.cost;
        this._instructor_id = data.instructor_id;
        this._hasJoined = (data.hasJoined === 'True');
        this._address = new Address();
        data.address = JSON.parse(data.address);
        this._address.apt = data.address.apt;
        this._address.street = data.address.street;
        this._address.city = data.address.city;
        this._address.country = data.address.country;
        this._address.zipcode = data.address.zipcode;
        this._spots_taken = data.spotsTaken;
    }
}

export class Address {
    apt: string;
    street: string;
    city: string;
    country: string;
    zipcode: number;

    constructor(
        apt: string = '',
        street: string = '',
        city: string = '',
        country: string = '',
        zipcode: number = 0
    ) {
        this.apt = apt;
        this.street = street;
        this.city = city;
        this.country = country;
        this.zipcode = zipcode;
    }
}
