import { describe, it, expect, beforeEach } from "vitest";
import { Salary } from "../../src/models/Salary.js";

describe("Salary", () => {
  // TODO: Create a valid salary in beforeEach, as in Expense.test.js.
  let salary;

  beforeEach(() => {
    salary = new Salary({
      id: "1001",
      amount: 12000.12345,
      date: "2026-11-12",
    });
  });

  // TODO: Replace each it.todo with an it test. Add any other cases you think of.
  it("stores the amount and pay date", () => {
    expect(salary.amount).not.toBeNull();
    expect(salary.date).not.toBeNull();
  });
  it("rounds the amount to 2 decimal places", () => {
    expect(salary.amount).toBe(12000.12);
  });

  describe("validate()", () => {
    it("returns no errors for a valid salary", () => {
      expect(salary.validate()).not.toEqual([
        "amount must be a number greater than 0",
      ]);
      expect(salary.validate()).not.toEqual([
        "date must be a valid date in the format YYYY-MM-DD",
      ]);
    });
    it("rejects an amount of zero", () => {
      salary.amount = 0;
      expect(salary.validate()).toEqual([
        "amount must be a number greater than 0",
      ]);
    });
    it("rejects a negative amount", () => {
      salary.amount = -1000;
      expect(salary.validate()).toEqual([
        "amount must be a number greater than 0",
      ]);
    });
    it("rejects a pay date in the wrong format", () => {
      salary.date = "11-12-2026";
      expect(salary.validate()).toEqual([
        "date must be a valid date in the format YYYY-MM-DD",
      ]);
    });
    it("rejects a pay date that does not exist", () => {
      salary.date = "2026-02-31";
      expect(salary.validate()).toEqual([
        "date must be a valid date in the format YYYY-MM-DD",
      ]);
    });
  });
});
