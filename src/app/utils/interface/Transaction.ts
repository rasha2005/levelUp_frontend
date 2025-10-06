export interface Transaction {
    id: string;
    amount: number;
    createdAt: Date;
  }
  
  export interface WalletWithTransactions {
    id: string;
    balance: number;
    transactions: Transaction[];
  }
  
  export interface InstructorRevenueSummary {
    instructorId: string;
    instructorEmail:string;
    instructorName: string;
    totalEarnings: number;
    adminEarnings: number;
  }
  
  export interface TransactionSummaryResponse {
    total: number;
    data: InstructorRevenueSummary[];
  }