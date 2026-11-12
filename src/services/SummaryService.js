//import { Ledger } from "../respositories/Ledger";
/**
 * Calculates totals across all expenses and salaries.
 */
export class SummaryService {
  /**
   * @param {import('../repositories/Ledger.js').Ledger} expenses - Ledger of expenses.
   * @param {import('../repositories/Ledger.js').Ledger} salaries - Ledger of salaries.
   */
  constructor(expenses, salaries) {
    this.expenses = expenses;
    this.salaries = salaries;
  }

  /**
   * Returns the summary totals, each rounded to 2 decimal places.
   *
   * @returns {{ salary: number, basic: number, extra: number, total: number, savings: number }}
   */
  getSummary() {
    // TODO: Add up the amounts of all salaries.
    // TODO: Add up the expense amounts by category (basic and extra),
    //       and the overall total of all expenses.
    // TODO: Calculate savings as total salary minus total expenses.
    // TODO: Round every total to 2 decimal places.
    const totalSalary = this.salaries
      .findAll()
      .reduce((sum, salary) => sum + salary.amount, 0);
    const totalBasic = this.expenses
      .findAll()
      .filter((expense) => expense.category === "basic")
      .reduce((sum, expense) => sum + expense.amount, 0);
    const totalExtra = this.expenses
      .findAll()
      .filter((expense) => expense.category === "extra")
      .reduce((sum, expense) => sum + expense.amount, 0);
    return {
      salary: Math.round(totalSalary * 100) / 100,
      basic: Math.round(totalBasic * 100) / 100,
      extra: Math.round(totalExtra * 100) / 100,
      total: Math.round((totalBasic + totalExtra) * 100) / 100,
      savings:
        Math.round((totalSalary - (totalBasic + totalExtra)) * 100) / 100,
    };
  }
}
