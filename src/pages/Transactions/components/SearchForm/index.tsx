import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { SearchFormContainer } from './styles'

const searchFormSchemaInputs = z.object({
	query: z.string(),
})

type SearchFormInput = z.infer<typeof searchFormSchemaInputs>

export function SearchForm() {
	const { register, handleSubmit } = useForm<SearchFormInput>({
		resolver: zodResolver(searchFormSchemaInputs),
	})
	const {fetchTransactions} = useContext(TransactionsContext)

	function handleSearchTransaction(data: SearchFormInput) {
		fetchTransactions(data.query)
	}

	return (
		<SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
			<input
				type='text'
				placeholder='Busque uma transação'
				{...register('query')}
			/>
			<button>
				<MagnifyingGlass size={20} />
				Buscar
			</button>
		</SearchFormContainer>
	)
}
