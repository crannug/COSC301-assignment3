import { describe, it, expect } from "vitest";
import { SummaryService } from "../../src/services/SummaryService";
import { Expense } from "../../src/models/Expense";
import { Salary } from "../../src/models/Salary";

describe("SummaryService", () => {
  const expenses = {
    findAll() {
      return [
        new Expense({
          description: "Groceries",
          amount: 60,
          category: "basic",
          date: "2026-11-01",
        }),
        new Expense({
          description: "Netflix",
          amount: 25,
          category: "extra",
          date: "2026-11-05",
        }),
      ];
    },
  };

  const salaries = {
    findAll() {
      return [new Salary({ amount: 5000, date: "2026-11-01" })];
    },
  };
  //
  //   const expenses = {
  //     findAll() {
  //       return [
  //         new Expense({ description: 'Rent', amount: 1200, category: 'basic', date: '2026-11-01' }),
  //         new Expense({ description: 'Movie', amount: 15, category: 'extra', date: '2026-11-05' }),
  //       ];
  //     },
  //   };
  //
  //   const salaries = {
  //     findAll() {
  //       return [new Salary({ amount: 3000, date: '2026-11-01' })];
  //     },
  //   };
  //
  //   const summary = new SummaryService(expenses, salaries).getSummary();
  //
  //   Here summary.basic is 1200, summary.extra is 15, summary.total is 1215,
  //   and summary.savings is 1785.
  const summary = new SummaryService(expenses, salaries).getSummary();

  // TODO: Replace each it.todo with an it test. Add any other cases you think of.
  describe("getSummary()", () => {
    it("returns all zeros when there are no expenses or salaries", () => {
      const emptyExpenses = {
        findAll() {
          return [];
        },
      };
      const emptySalaries = {
        findAll() {
          return [];
        },
      };
      const emptySummary = new SummaryService(
        emptyExpenses,
        emptySalaries,
      ).getSummary();
      expect(emptySummary).toEqual({
        salary: 0,
        basic: 0,
        extra: 0,
        total: 0,
        savings: 0,
      });
    });
    it("adds up all salaries", () => {
      expect(summary.salary).toBe(5000);
    });
    it("adds up basic and extra expenses separately", () => {
      expect(summary.basic).toBe(60);
      expect(summary.extra).toBe(25);
    });
    it("calculates the total of all expenses", () => {
      expect(summary.total).toBe(85);
    });
    it("calculates savings as total salary minus total expenses", () => {
      expect(summary.savings).toBe(5000 - 85);
    });
    it("returns negative savings when expenses are higher than salary", () => {
      const hugeExpense = {
        findAll() {
          return [
            new Expense({
              description: "Huge expense",
              amount: 50000,
              category: "basic",
              date: "2026-11-06",
            }),
          ];
        },
      };
      const smallSalary = {
        findAll() {
          return [new Salary({ amount: 5000, date: "2026-11-01" })];
        },
      };
      const negativeSavings = new SummaryService(hugeExpense, smallSalary);

      expect(negativeSavings.getSummary().savings).toBe(-45000);
    });
    it("rounds totals to 2 decimal places", () => {
      const roundExpenses = {
        findAll() {
          return [
            new Expense({
              description: "Multiple decimal places",
              amount: 444.44444,
              category: "basic",
              date: "2026-11-01",
            }),
          ];
        },
      };
      const roundSalary = {
        findAll() {
          return [new Salary({ amount: 555.55555, date: "2026-11-02" })];
        },
      };
      const decimalPlaces = new SummaryService(roundExpenses, roundSalary);

      expect(decimalPlaces.getSummary().basic).toBe(444.44);
      expect(decimalPlaces.getSummary().salary).toBe(555.56);
      expect(decimalPlaces.getSummary().savings).toBe(111.12);
    });
  });
});
