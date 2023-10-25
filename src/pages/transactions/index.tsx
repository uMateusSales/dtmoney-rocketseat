import { Header } from "../../components/Header";
import Summary from "../../components/Summary";
import {
  PriceHighlight,
  TransactionsTable,
  TrasactionContainer,
} from "./styles";
import { SearchForm } from "../../components/SearchForm";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import { FormatarPreço, FormatarData } from "../../utils/formater";

export const Transactions = () => {
  const { transactions } = useContext(TransactionContext);

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
                    <PriceHighlight variant={i.type}>
                      {i.type === "saida" && "- "}
                      {i.type === "entrada" && "+ "}
                      {FormatarPreço.format(i.price)}
                    </PriceHighlight>
                  </td>
                  <td>{i.category}</td>
                  <td>{FormatarData.format(new Date())}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TrasactionContainer>
    </div>
  );
};
