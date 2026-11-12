import { Router } from "express";
import { Salary } from "../models/Salary.js";

/**
 * Creates the routes for /api/salaries.
 * Each salary is { id, date, amount }.
 *
 * @param {import('../repositories/Ledger.js').Ledger} ledger - Ledger that stores salaries.
 * @returns {Router}
 */
export function salaryRoutes(ledger) {
  const router = Router();

  // TODO: Respond with all salaries (200).
  router.get("/", (req, res) => {
    res.json(ledger.findAll());
  });

  // TODO: Respond with the salary with the given id (200), or 404 if not found.
  router.get("/:id", (req, res) => {
    const salary = ledger.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ error: "Salary not found" });
    }
    res.json(salary);
  });

  // TODO: Build a Salary from the request body, add it to the ledger,
  //       and respond with the saved salary (201).
  router.post("/", (req, res) => {
    const salary = ledger.add(toSalary(req.body));
    res.status(201).json(salary);
  });

  // TODO: Build a Salary from the request body, update the salary with
  //       the given id, and respond with it (200), or 404 if not found.
  router.put("/:id", (req, res) => {
    const salary = ledger.update(req.params.id, toSalary(req.body));
    if (!salary) {
      return res.status(404).json({ error: "Salary not found" });
    }
    res.json(salary);
  });

  // TODO: Delete the salary with the given id and respond with 204,
  //       or 404 if not found.
  router.delete("/:id", (req, res) => {
    if (!ledger.delete(req.params.id)) {
      return res.status(404).json({ error: "Salary not found " });
    }
    res.status(204).end();
  });

  return router;
}

/**
 *
 * @param {*} body
 */
function toSalary(body = {}) {
  return new Salary({ id: body.id, amount: body.amount, date: body.date });
}
