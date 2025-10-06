export default interface InstructorData {
    id?: string;
    img?: string;
    name: string;
    email: string;
    mobile: string;
    rating: number;
    description?: string;
    experience?: string;
    resume?: string;
    category?: string;
    isApproved?: boolean;
    specializations?: string[];
  }