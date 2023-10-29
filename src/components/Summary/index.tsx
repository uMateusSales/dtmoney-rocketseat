import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";

import { FormatarPreço } from "../../utils/formater";
import { useSummary } from "../../hooks/useSummary";

const Summary = () => {
  const summary = useSummary();
  return (
    <>
      <SummaryContainer>
        <SummaryCard>
          <header>
            <span>Entradas </span>
            <ArrowCircleUp size={32} color="#00b37e" />
          </header>
          <strong>{FormatarPreço.format(summary.entrada)}</strong>
        </SummaryCard>
        <SummaryCard>
          <header>
            <span>Saidas </span>
            <ArrowCircleDown size={32} color="#f75a68" />
          </header>
          <strong>{FormatarPreço.format(summary.saida)}</strong>
        </SummaryCard>
        <SummaryCard variant="green">
          <header>
            <span>Total </span>
            <CurrencyDollar size={32} color="#fff" />
          </header>
          <strong>{FormatarPreço.format(summary.total)}</strong>
        </SummaryCard>
      </SummaryContainer>
      ;
    </>
  );
};

export default Summary;
