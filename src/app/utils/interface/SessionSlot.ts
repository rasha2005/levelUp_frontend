export default interface SessionSlot {
    id?: string;
    instructorId: string;
    userId: string;
    roomId: string;
    title: string;
    isRated: boolean;
    createdAt: string;   
    startTime: string;   
    endTime: string;    
  }