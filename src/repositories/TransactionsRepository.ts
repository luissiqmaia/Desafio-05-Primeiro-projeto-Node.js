/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionBalanceModel {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionBalanceModel {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulatorT: Balance, nextT: Transaction) => {
        if (nextT.type === 'income') {
          accumulatorT.income += nextT.value;
          accumulatorT.total += nextT.value;
        } else {
          accumulatorT.outcome += nextT.value;
          accumulatorT.total -= nextT.value;
        }
        return accumulatorT;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
