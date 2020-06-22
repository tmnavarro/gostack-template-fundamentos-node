import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): { transactions: Transaction[]; balance: Balance } {
    const transactions = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (currentValue, transaction) => {
        if (transaction.type === 'income') {
          currentValue.income += transaction.value;
          currentValue.total += transaction.value;
        } else {
          currentValue.outcome += transaction.value;
          currentValue.total -= transaction.value;
        }

        return currentValue;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
