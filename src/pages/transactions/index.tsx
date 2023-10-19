import { Header } from "../../components/Header";
import Summary from "../../components/Summary";
import {
  PriceHighlight,
  TransactionsTable,
  TrasactionContainer,
} from "./styles";
import { SearchForm } from "../../components/SearchForm";
import { useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  type: "entrada" | "saida";
  category: string;
  price: number;
  createdAt: string;
}

export const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/transactions");

      const json = await response.json();

      setTransactions(json);

      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <Summary />

      <TrasactionContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((i) => {
              return (
                <tr key={i.id}>
                  <td width="50%">{i.description}</td>
                  <td>
                    <PriceHighlight variant={i.type}>{i.price}</PriceHighlight>
                  </td>
                  <td>{i.category}</td>
                  <td>{i.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TrasactionContainer>
    </div>
  );
};
