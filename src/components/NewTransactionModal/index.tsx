import * as Dialog from "@radix-ui/react-dialog";

import {
  CloseDialog,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";

import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.coerce.number(),
  type: z.enum(["entrada", "saida"]).default("entrada"),
  category: z.string(),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export const NewTransactionModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  const handleNewTransaction = async (data: NewTransactionFormInputs) => {
    console.log(data);
  };

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseDialog>
          <X size={24} />
        </CloseDialog>

        <form onSubmit={handleSubmit(handleNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price")}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <TransactionType>
            <TransactionTypeButton value="entrada" variant="entrada">
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>
            <TransactionTypeButton value="saida" variant="saida">
              <ArrowCircleDown size={24} />
              Saida
            </TransactionTypeButton>
          </TransactionType>

          <button disabled={isSubmitting} type="submit">
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
};
