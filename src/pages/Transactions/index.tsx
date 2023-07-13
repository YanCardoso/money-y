import { useContext } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { SearchForm } from './components/SearchForm'
import {
	PriceHighlight,
	TransactionsTable,
	TransactionsTableContainer,
} from './styles'

export function Transactions() {
	const { transactions } = useContext(TransactionsContext)
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
