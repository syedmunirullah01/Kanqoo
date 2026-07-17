import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Ticket, ShoppingCart, DollarSign, Bookmark } from "lucide-react";

const stats = [
  {
    icon: <Ticket className="w-6 h-6 text-orange-400" />,
    value: "$13.4k",
    label: "Total Sales",
    change: "+38%",
    changeColor: "text-orange-500",
    period: "Last 6 months",
    periodColor: "bg-gray-100 text-gray-700"
  },
  {
    icon: <ShoppingCart className="w-6 h-6 text-teal-400" />,
    value: "155K",
    label: "Total Orders",
    change: "+22%",
    changeColor: "text-teal-500",
    period: "Last 4 months",
    periodColor: "bg-gray-100 text-gray-700"
  },
  {
    icon: <DollarSign className="w-6 h-6 text-sky-400" />,
    value: "$89.34k",
    label: "Total Profit",
    change: "-16%",
    changeColor: "text-red-500",
    period: "Last One year",
    periodColor: "bg-gray-100 text-gray-700"
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <Card key={idx} className="rounded-2xl shadow border border-gray-200">
          <CardContent className="p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="bg-gray-50 rounded-xl p-2 flex items-center justify-center">
                {stat.icon}
              </div>
              <span className={`font-semibold text-sm ${stat.changeColor}`}>{stat.change} {stat.change.startsWith('+') ? <span>&uarr;</span> : <span>&darr;</span>}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${stat.periodColor}`}>
              {stat.period}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}