export class RankedTopic {
    title: string;
    rank: number;

    constructor(title: string, rank: number = 0){
        this.title = title;
        this.rank = rank;
    }

    setRank(newRank : number){
        this.rank = newRank;
    }
    
}