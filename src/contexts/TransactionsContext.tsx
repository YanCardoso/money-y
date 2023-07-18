import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface CreateTransactionInput {
	category: string
	description: string
	price: number
	type: 'income' | 'outcome'
}

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
	createTransactionInput: (data: CreateTransactionInput) => Promise<void>
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

	async function createTransactionInput(data: CreateTransactionInput) {
		const { category, description, price, type } = data

		const response = await api.post('transactions', {
			category,
			description,
			price,
			type,
			created_at: new Date(),
		})

		setTransactions(state => [response.data, ...state])
	}

	useEffect(() => {
		fetchTransactions()
	}, [])

	return (
		<TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransactionInput }}>
			{children}
		</TransactionsContext.Provider>
	)
}
