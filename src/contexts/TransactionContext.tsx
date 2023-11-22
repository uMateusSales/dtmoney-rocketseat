import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "entrada" | "saida";
  price: number;
  category: string;
  createdAt: string;
}
interface CreateTransactionProps {
  description: string;
  price: number;
  type: "entrada" | "saida";
  category: string;
  createdAt: string;
}
interface TransactionContextType {
  transactions: Transaction[];
  getTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionProps) => Promise<void>;
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

  const getTransactions = useCallback(async (query?: string) => {
    try {
      const response = await api.get("/transactions", { params: { q: query } });

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createTransaction = useCallback(
    async (data: CreateTransactionProps) => {
      const response = await api.post("transactions", { ...data });

      console.log(data);

      setTransactions([response.data, ...transactions]);
    },
    []
  );

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, getTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
