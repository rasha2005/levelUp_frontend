export default interface Event {
    id?: string;
    title: string;
    price: string;
    start: string;
    end?: string;
    allDay?: boolean;
    isRecurring?: boolean;          
    recurrenceRule?: string | null;         
    recurringExceptions?: string[];
  }

