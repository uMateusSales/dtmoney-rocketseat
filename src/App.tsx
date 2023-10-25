import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./pages/transactions";
import { TranscationsProvider } from "./contexts/TransactionContext";

function App() {
  return (
    <>
      <TranscationsProvider>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <Transactions />
        </ThemeProvider>
      </TranscationsProvider>
    </>
  );
}

export default App;
