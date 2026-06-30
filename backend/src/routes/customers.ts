import { Router, Request, Response } from "express";
import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface CustomerRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  status: "active" | "inactive";
  created_at: Date;
  updated_at: Date;
}

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<CustomerRow[]>(
      "SELECT * FROM customers ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch customers", error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<CustomerRow[]>(
      "SELECT * FROM customers WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch customer", error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email, phone, company, status = "active" } = req.body;

  if (!name || !email) {
    res.status(400).json({ message: "Name and email are required" });
    return;
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO customers (name, email, phone, company, status) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone ?? null, company ?? null, status]
    );
    res.status(201).json({ id: result.insertId, name, email, phone, company, status });
  } catch (error) {
    res.status(500).json({ message: "Failed to create customer", error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name, email, phone, company, status } = req.body;

  try {
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE customers SET name = ?, email = ?, phone = ?, company = ?, status = ? WHERE id = ?",
      [name, email, phone ?? null, company ?? null, status, req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json({ message: "Customer updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update customer", error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM customers WHERE id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete customer", error });
  }
});

export default router;
