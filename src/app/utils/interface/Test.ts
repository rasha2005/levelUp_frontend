export interface Test {
    id: string;
    slotId: string;
    questions: string[];
    score?: number;    
    attended: boolean;
    createdAt: Date;
}  