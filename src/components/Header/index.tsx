import { HeaderContainer, HeaderContent, NewTrasanctionButton } from "./styles";

import logoImg from "../../assets/logo.svg";
export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} />
        <NewTrasanctionButton>Nova transação</NewTrasanctionButton>
      </HeaderContent>
    </HeaderContainer>
  );
};
