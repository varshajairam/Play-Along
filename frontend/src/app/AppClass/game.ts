export const any_skill: string = "ANY";

export class Game {
    private _id: number;
    private _game_type_id: number;
    private _name: string;
    private _date: Date;
    private _players_count: number;
    private _created_by: string;
    private _created_on: Date;
    private _owner_id: number;
    private _cost: number;
    private _address: Address;
    private _skill: string;
    private _hasJoined: boolean;

    constructor(id: number = 0,
        game_type_id: number = 0,
        name: string = "",
        date: Date = new Date(),
        players_count: number = 0,
        created_by: string = "",
        created_on: Date = new Date(),
        owner_id: number = 0,
        cost: number = 0,
        hasJoined: boolean = false
    ){
        this._id = id;
        this._game_type_id = game_type_id;
        this._name = name;
        this._date = date;
        this._players_count = players_count;
        this._created_by = created_by;
        this._created_on = created_on;
        this._owner_id = owner_id;
        this._cost = cost;
        this._hasJoined = hasJoined;
    }

    get name(): string{
        return this._name;
    }

    get date(): Date{
        return this._date;
    }

    get players_count(): number{
        return this._players_count;
    }

    get hasJoined(): boolean{
        return this._hasJoined;
    }

    get address(): Address{
        return this._address;
    }

    get cost(): number{
        return this._cost;
    }

    get skill(): string{
        return this._skill;
    }

    map(data){
        this._name = data.name;
        this._date = data.date;
        this._players_count = data.players_count;
        this._cost = data.cost;
        this._skill = data.required_skill_level_id ? data.required_skill_level_id : any_skill;
        this._hasJoined = (data.hasJoined === "True");
        this._skill = data.skill;
        this._address = new Address();
        data.address = JSON.parse(data.address);
        this._address.apt = data.address.apt;
        this._address.street = data.address.street;
        this._address.city = data.address.city;
        this._address.country = data.address.country;
        this._address.zipcode = data.address.zipcode;
    }
}

export class Address {    
    apt: string;
    street: string;
    city: string;
    country: string;
    zipcode: number;
    
    constructor(
        apt: string = "",
        street: string = "",
        city: string = "",
        country: string = "",
        zipcode: number = 0
    ){
        this.apt = apt;
        this.street = street;
        this.city = city;
        this.country = country;
        this.zipcode = zipcode;
    }
}