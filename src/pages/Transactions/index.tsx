import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import {
	PriceHighlight,
	TransactionsTable,
	TransactionsTableContainer,
} from './styles'

export function Transactions() {
	return (
		<div>
			<Header />
			<Summary />

			<TransactionsTableContainer>
				<TransactionsTable>
					<tbody>
						<tr>
							<td>Desenvolvimento de site</td>
							<td>
								<PriceHighlight variant='income'>R$ 12.000,00</PriceHighlight>
							</td>
							<td>Venda</td>
							<td>13/04/2023</td>
						</tr>
						<tr>
							<td>Aluguel do apartamento</td>
							<td>
								<PriceHighlight variant='outcome'>- R$ 1.200,00</PriceHighlight>
							</td>
							<td>Casa</td>
							<td>04/02/2023</td>
						</tr>
					</tbody>
				</TransactionsTable>
			</TransactionsTableContainer>
		</div>
	)
}
