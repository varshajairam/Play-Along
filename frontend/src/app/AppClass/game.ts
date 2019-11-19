export class Game {
    id: number;
    game_type_id: number;
    name: string;
    date: Date;
    players_count: number;
    created_by: string;
    created_on: Date;
    owner_id: number;
    cost: number;
    address: Address;
    skill: Skill;
    hasJoined: boolean;

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
        this.id = id;
        this.game_type_id = game_type_id;
        this.name = name;
        this.date = date;
        this.players_count = players_count;
        this.created_by = created_by;
        this.created_on = created_on;
        this.owner_id = owner_id;
        this.cost = cost;
        this.hasJoined = hasJoined;
    }

    map(data){ // add null checks
        this.name = data.name;
        this.date = data.date;
        this.players_count = data.players_count;
        this.cost = data.cost;
        this.skill = data.required_skill_level_id;
        this.hasJoined = data.hasJoined;
        this.skill = data.skill;
        this.address = new Address();
        this.address.apt = data.address.apt;
        this.address.street = data.address.street;
        this.address.city = data.address.city;
        this.address.country = data.address.country;
        this.address.zipcode = data.address.zipcode;
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

export enum Skill {New = 1, Beginner, Intermediate, Advanced};