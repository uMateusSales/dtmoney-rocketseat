import { ReactNode, createContext, useEffect, useState } from "react";

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

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3333/transactions");

      const data = await response.json();

      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
