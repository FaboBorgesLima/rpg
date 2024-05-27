import { Entity } from "../entity/entity";

export class Player extends Entity {
    private characterClass:string;

    constructor(name:string, characterClass:string) {
        super(name);
        this.characterClass = characterClass;
    }
}