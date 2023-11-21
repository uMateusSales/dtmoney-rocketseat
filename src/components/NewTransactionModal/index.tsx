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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.coerce.number(),
  type: z.enum(["entrada", "saida"]),
  category: z.string(),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export const NewTransactionModal = () => {
  const { createTransaction } = useContext(TransactionContext);

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  const handleNewTransaction = async (data: NewTransactionFormInputs) => {
    createTransaction({ ...data, createdAt: new Date().toLocaleString() });
    reset();
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
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="entrada" value="entrada">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="saida" value="saida">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button disabled={isSubmitting} type="submit">
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
};
