import Transaction from '../models/Transaction';
// import BalanceModel from '../models/Balance';
// import Balance from '../models/Balance';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactioDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balanco!: Balance;

  constructor() {
    this.transactions = [];
    this.balanco = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    this.balanco.total = this.balanco.income - this.balanco.outcome;
    return this.balanco;
  }

  public create({ title, type, value }: CreateTransactioDTO): Transaction {
    if (type === 'income') {
      this.balanco.income += value;
      const transaction = new Transaction({ title, value, type });

      this.transactions.push(transaction);

      return transaction;
    }

    this.balanco.outcome += value;
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
