import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { SearchFormContainer } from './styles'

const searchFormSchemaInputs = z.object({
	query: z.string(),
})

type SearchFormInput = z.infer<typeof searchFormSchemaInputs>

export function SearchForm() {
	const { register, handleSubmit } = useForm<SearchFormInput>({
		resolver: zodResolver(searchFormSchemaInputs),
	})

	function handleSearchTransaction(data: SearchFormInput) {
		console.log(data)
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
