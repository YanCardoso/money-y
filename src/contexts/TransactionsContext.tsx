import { ReactNode, createContext, useEffect, useState } from 'react'

interface TransactionsData {
	id: number
	description: string
	type: 'income' | 'outcome'
	category: string
	price: number
	created_at: string
}

interface TransactionContextType {
	transactions: TransactionsData[]
}

interface TransactionContextProps {
	children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsContextProvider({
	children,
}: TransactionContextProps) {
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
		<TransactionsContext.Provider value={{ transactions }}>
			{children}
		</TransactionsContext.Provider>
	)
}
