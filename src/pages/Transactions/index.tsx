import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
	PriceHighlight,
	TransactionsTable,
	TransactionsTableContainer,
} from './styles'

interface TransactionsData {
	id: 1
	description: string
	type: 'income' | 'outcome'
	category: string
	price: number
	created_at: string
}

export function Transactions() {
	const [transactions, setTransactions] = useState<TransactionsData[]>([])

	async function LoadTransactions() {
		const response = await fetch(`http://localhost:3000/transactions`)
		const data = await response.json()

		setTransactions(data)
	}

	useEffect(() => {
		LoadTransactions()
	}, [])

	return (
		<div>
			<Header />
			<Summary />
			<TransactionsTableContainer>
				<SearchForm />
				<TransactionsTable>
					<tbody>
						{transactions.map((transaction) => {
							return (
								<tr key={transaction.id}>
									<td>{transaction.description}</td>
									<td>
										<PriceHighlight variant={transaction.type}>
											{transaction.price}
										</PriceHighlight>
									</td>
									<td>{transaction.category}</td>
									<td>{transaction.created_at}</td>
								</tr>
							)
						})}
					</tbody>
				</TransactionsTable>
			</TransactionsTableContainer>
		</div>
	)
}
