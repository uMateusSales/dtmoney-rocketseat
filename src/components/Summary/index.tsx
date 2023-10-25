import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

const Summary = () => {
  const { transactions } = useContext(TransactionContext);

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "entrada") {
        acc.entrada += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.saida += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    },

    {
      entrada: 0,
      saida: 0,
      total: 0,
    }
  );

  return (
    <>
      <SummaryContainer>
        <SummaryCard>
          <header>
            <span>Entradas </span>
            <ArrowCircleUp size={32} color="#00b37e" />
          </header>
          <strong>{summary.entrada}</strong>
        </SummaryCard>
        <SummaryCard>
          <header>
            <span>Saidas </span>
            <ArrowCircleDown size={32} color="#f75a68" />
          </header>
          <strong>{summary.saida}</strong>
        </SummaryCard>
        <SummaryCard variant="green">
          <header>
            <span>Total </span>
            <CurrencyDollar size={32} color="#fff" />
          </header>
          <strong>{summary.total}</strong>
        </SummaryCard>
      </SummaryContainer>
      ;
    </>
  );
};

export default Summary;
