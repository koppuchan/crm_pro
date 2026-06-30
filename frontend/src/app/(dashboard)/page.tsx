import { StatCards } from "@/components/dashboard/StatCards";
import { RecentTable } from "@/components/dashboard/RecentTable";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">ダッシュボード</h1>

      <div className="flex items-center justify-between rounded-lg bg-purple-600 px-4 py-3 text-sm text-white">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>CRM Pro へようこそ。案件とメンバーの管理を始めましょう。</span>
        </div>
        <span className="hidden shrink-0 text-purple-200 sm:inline">詳しく見る →</span>
      </div>

      <StatCards />
      <RecentTable />
    </div>
  );
}
