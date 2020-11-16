export class roomContent {
    name: string = "";
    number: Number = 0;
    events: string[] = [];
    
    constructor(name: string, number: Number){
        this.name = name;
        this.number = number;
    }

    getRoomName(){
        return this.name;
    }

    getRoomNumber(){
        return this.number;
    }

    getRoomEvents(){
        return this.events;
    }

    addEvent(event: string){
        this.events.push(event);
    }

    deleteEvent(event: string){
        var count: number = 0;
        while (this.events[count] != event){
            count++;
        }

        this.events.splice(count, 1);
    }
}