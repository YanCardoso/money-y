import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import {
	CloseButton,
	Content,
	Overlay,
	TransactionType,
	TransactionTypeButton,
} from './styles'

const NewTransactionFormSchema = z.object({
	description: z.string(),
	price: z.number(),
	category: z.string(),
	type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputsType = z.infer<typeof NewTransactionFormSchema>

export function NewTransactionModal() {
	const { register, handleSubmit, control, reset } =
		useForm<NewTransactionFormInputsType>({
			resolver: zodResolver(NewTransactionFormSchema),
			defaultValues: {
				type: 'income',
			},
		})

		const {createTransactionInput} = useContext(TransactionsContext)

	function handleCreateNewTransaction(data: NewTransactionFormInputsType) {
		createTransactionInput(data)
		reset()
	}

	return (
		<Dialog.Portal>
			<Overlay />
			<Content>
				<Dialog.Title>Nova Transação</Dialog.Title>
				<CloseButton>
					<X size={24} />
				</CloseButton>
				<form onSubmit={handleSubmit(handleCreateNewTransaction)}>
					<input
						type='text'
						placeholder='Descrição'
						required
						{...register('description')}
					/>
					<input
						type='number'
						placeholder='Preço'
						required
						{...register('price', { valueAsNumber: true })}
					/>
					<input
						type='text'
						placeholder='Categoria'
						required
						{...register('category')}
					/>

					<Controller
						control={control}
						name='type'
						render={({ field }) => {
							return (
								<TransactionType
									onValueChange={field.onChange}
									value={field.value}
								>
									<TransactionTypeButton
										variant='income'
										value='income'
									>
										<ArrowCircleUp size={24} />
										Entrada
									</TransactionTypeButton>
									<TransactionTypeButton
										variant='outcome'
										value='outcome'
									>
										<ArrowCircleDown size={24} />
										Saída
									</TransactionTypeButton>
								</TransactionType>
							)
						}}
					/>

					<button type='submit'>Cadastrar</button>
				</form>
			</Content>
		</Dialog.Portal>
	)
}
