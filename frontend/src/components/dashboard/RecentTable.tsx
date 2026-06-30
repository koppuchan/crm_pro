type Status = "primary" | "success" | "warning" | "danger" | "neutral";

interface Row {
  name: string;
  role: string;
  amount: string;
  status: Status;
  statusLabel: string;
  date: string;
  initial: string;
  color: string;
}

const statusStyles: Record<Status, string> = {
  primary: "bg-purple-600/20 text-purple-300",
  success: "bg-green-500/20 text-green-300",
  warning: "bg-orange-500/20 text-orange-300",
  danger: "bg-red-500/20 text-red-300",
  neutral: "bg-gray-500/20 text-gray-300",
};

const rows: Row[] = [
  {
    name: "山田 太郎",
    role: "ソフトウェアエンジニア",
    amount: "¥ 999,400",
    status: "primary",
    statusLabel: "進行中",
    date: "2026/01/15",
    initial: "山",
    color: "bg-purple-600",
  },
  {
    name: "佐藤 花子",
    role: "プロジェクトマネージャー",
    amount: "¥ 863,200",
    status: "danger",
    statusLabel: "要対応",
    date: "2026/01/14",
    initial: "佐",
    color: "bg-red-500",
  },
  {
    name: "鈴木 一郎",
    role: "UIデザイナー",
    amount: "¥ 756,800",
    status: "success",
    statusLabel: "完了",
    date: "2026/01/13",
    initial: "鈴",
    color: "bg-green-500",
  },
  {
    name: "田中 美咲",
    role: "マーケティング担当",
    amount: "¥ 645,300",
    status: "warning",
    statusLabel: "保留",
    date: "2026/01/12",
    initial: "田",
    color: "bg-orange-500",
  },
  {
    name: "高橋 健",
    role: "営業担当",
    amount: "¥ 532,100",
    status: "neutral",
    statusLabel: "未着手",
    date: "2026/01/11",
    initial: "高",
    color: "bg-gray-500",
  },
];

export function RecentTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-gray-700 bg-gray-800/80 text-xs uppercase tracking-wide text-gray-400">
          <tr>
            <th className="px-6 py-4 font-medium">クライアント</th>
            <th className="px-6 py-4 font-medium">金額</th>
            <th className="px-6 py-4 font-medium">ステータス</th>
            <th className="px-6 py-4 font-medium">日付</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {rows.map((row) => (
            <tr key={row.name} className="hover:bg-gray-700/30">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white ${row.color}`}
                  >
                    {row.initial}
                  </div>
                  <div>
                    <p className="font-medium text-white">{row.name}</p>
                    <p className="text-xs text-gray-400">{row.role}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-300">{row.amount}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[row.status]}`}
                >
                  {row.statusLabel}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-400">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
