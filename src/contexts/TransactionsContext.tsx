import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'

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
		const response = await api.get('/transactions', {
			params: {
				q: query,
			},
		})

		setTransactions(response.data)
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
