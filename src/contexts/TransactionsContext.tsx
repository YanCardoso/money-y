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
	fetchTransactions: (query: string) => Promise<void>
}

interface TransactionContextProps {
	children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsContextProvider({
	children,
}: TransactionContextProps) {
	const [transactions, setTransactions] = useState<TransactionsData[]>([])

	async function fetchTransactions(query?: string) {
		const url = new URL('http://localhost:3000/transactions')

		if (query) {
			url.searchParams.append('q', query)
		}

		const response = await fetch(url)
		const data = await response.json()

		setTransactions(data)
	}

	useEffect(() => {
		fetchTransactions()
	}, [])

	return (
		<TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
			{children}
		</TransactionsContext.Provider>
	)
}
