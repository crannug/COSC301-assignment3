import { MoneyEntry } from "./MoneyEntry.js";

/**
 * A salary payment: an amount received on a pay date.
 * Has no fields of its own beyond those inherited from MoneyEntry.
 */
export class Salary extends MoneyEntry {
  // TODO: Accept { id, amount, date } and pass them to the MoneyEntry
  // constructor. See Expense.js for the pattern.
  constructor({ id, amount, date }) {
    super({ id, amount, date });
  }

  // TODO: Decide whether Salary needs its own validate() method,
  // or whether the one inherited from MoneyEntry is enough.
  // the one inherited from MoneyEntry is enough: it validates the fields used for Salary
}
