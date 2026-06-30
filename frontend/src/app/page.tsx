import { getCustomers } from "@/lib/api";

export default async function Home() {
  let customers: Awaited<ReturnType<typeof getCustomers>> = [];
  let error: string | null = null;

  try {
    customers = await getCustomers();
  } catch {
    error = "Unable to connect to API. Make sure the backend is running.";
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-zinc-200 bg-white px-6 py-4">
        <h1 className="text-xl font-semibold">CRM Pro</h1>
        <p className="text-sm text-zinc-500">Customer management dashboard</p>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <section className="rounded-lg border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 px-6 py-4">
              <h2 className="font-medium">Customers</h2>
              <p className="text-sm text-zinc-500">{customers.length} total</p>
            </div>

            {customers.length === 0 ? (
              <p className="px-6 py-8 text-sm text-zinc-500">
                No customers yet. Add data via the API or database.
              </p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Email</th>
                    <th className="px-6 py-3 font-medium">Company</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-zinc-100">
                      <td className="px-6 py-3">{customer.name}</td>
                      <td className="px-6 py-3">{customer.email}</td>
                      <td className="px-6 py-3">{customer.company ?? "—"}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                            customer.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
