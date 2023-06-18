export interface Loan {
    id: number;
    client: string;
    amount: number;
    date: string;
  }
  
  export interface FilterOptions {
    fromDate: string;
    toDate: string;
    client: string;
  }
  