import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "entrada" | "saida";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  getTransactions: (query?: string) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

interface TransactionsProviderProps {
  children: ReactNode;
}
export const TranscationsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getTransactions = async (query?: string) => {
    try {
      const response = await api.get("/transactions", { params: { q: query } });

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, getTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
