import { Header } from "../../components/Header";
import Summary from "../../components/Summary";
import {
  PriceHighlight,
  TransactionsTable,
  TrasactionContainer,
} from "./styles";

export const Transactions = () => {
  return (
    <div>
      <Header />
      <Summary />
      <TrasactionContainer>
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento do site</td>
              <td>
                <PriceHighlight variant="entrada">R$ 12.000,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
            <tr>
              <td width="50%">Hamburguer</td>
              <td>
                <PriceHighlight variant="saida">- R$ 59,00</PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>10/04/2022</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TrasactionContainer>
    </div>
  );
};
