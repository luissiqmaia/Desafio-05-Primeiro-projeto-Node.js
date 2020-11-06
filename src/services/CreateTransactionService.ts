/* eslint-disable class-methods-use-this */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: Omit<Transaction, 'id'>): Transaction {
    if (!/income|outcome/.test(type)) {
      throw new Error('Invalid type of transition.');
    }

    if (type === 'income' && value < 0) {
      throw new Error('For this type of transaction you must income.');
    }

    if (type === 'outcome' && value < 0) {
      throw new Error('For this type of transaction you must outcome.');
    }

    if (
      type === 'outcome' &&
      value > this.transactionsRepository.getBalance().total
    ) {
      throw new Error(
        'The value of income do not be greater than income value available!',
      );
    }

    const transition = new Transaction({ type, title, value });

    this.transactionsRepository.create(transition);
    return transition;
  }
}

export default CreateTransactionService;
