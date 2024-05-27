export abstract class Entity {
    protected id: number = 0;
    protected name: string = '';
    protected hitPoints: number = 0;
    protected attack: number = 0;
    protected defense: number = 0;
    protected xp: number = 0;

    constructor(name:string) {
        this.name = name;
    }

    // GETTERS
    public getId():number {
        return this.id;
    }
    public getName():string {
        return this.name;
    }
    public getHitPoints():number {
        return this.hitPoints;
    }
    public getAttack():number {
        return this.attack;
    }
    public getDefense():number {
        return this.defense;
    }
    public getXp():number {
        return this.xp;
    }

    // SETTERS 
    public setId(newId:number):void {
        this.id = newId;
    }
    public setHitPoints(newHitPoints:number):void {
        this.hitPoints = newHitPoints;
    } 
    public setAttack(newAttack:number):void {
        this.attack = newAttack;
    }
    public setDefense(newDefense:number):void {
        this.defense = newDefense;
    }
    public setXp(newXp:number):void {
        this.xp = newXp;
    }
}