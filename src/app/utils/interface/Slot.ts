interface Slot {
    title:string;
    startTime:Date;
    endTime:Date;
    roomId:string,
    userId?:string | null;
    instructorId:string;
    createdAt:Date;
}

export default Slot;