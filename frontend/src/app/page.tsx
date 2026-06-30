import { UserMenu } from "@/components/auth/UserMenu";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 text-zinc-900">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold">CRM Pro</h1>
          <p className="text-sm text-zinc-500">ダッシュボード</p>
        </div>
        <UserMenu />
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        <p className="text-sm text-zinc-500">CRM Proへようこそ。</p>
      </main>
    </div>
  );
}
