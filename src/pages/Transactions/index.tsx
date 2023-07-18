import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
	PriceHighlight,
	TransactionsTable,
	TransactionsTableContainer,
} from './styles'

export function Transactions() {
	const transactions = useContextSelector(TransactionsContext, (context) => {
		return context.transactions
	})
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
											{transaction.type === 'outcome' && '- '}
											{priceFormatter.format(transaction.price)}
										</PriceHighlight>
									</td>
									<td>{transaction.category}</td>
									<td>
										{dateFormatter.format(new Date(transaction.created_at))}
									</td>
								</tr>
							)
						})}
					</tbody>
				</TransactionsTable>
			</TransactionsTableContainer>
		</div>
	)
}
