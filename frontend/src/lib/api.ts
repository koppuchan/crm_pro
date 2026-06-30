const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export async function getCustomers(): Promise<Customer[]> {
  const res = await fetch(`${API_URL}/customers`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

export async function createCustomer(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}): Promise<Customer> {
  const res = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create customer");
  return res.json();
}
