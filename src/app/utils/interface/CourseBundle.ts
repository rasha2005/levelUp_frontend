export default interface CourseBundle {
    id?: string;                 
    name: string;                
    thumbnail?: string | null;          
    description: string;        
    price: number | "";               
    participantLimit: number | "";    
    startDate?: string;         
    endDate?: string;            
    isFreeTrial: boolean;        
    status?: "draft" | "published"; 
    sessionCount?: number | 0;       
    createdAt?: string; 
}