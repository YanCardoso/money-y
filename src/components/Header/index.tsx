import logo from '../../assets/Logo.svg'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img
					src={logo}
					alt=''
				/>
				<NewTransactionButton>Nova Transação</NewTransactionButton>
			</HeaderContent>
		</HeaderContainer>
	)
}
