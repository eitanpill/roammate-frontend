'use client'

import { TrendingUp, Download } from 'lucide-react'

export default function Earnings() {
  const earnings = [
    { month: 'June 2026', amount: 1200, bookings: 3, payout: 'Completed' },
    { month: 'May 2026', amount: 950, bookings: 2, payout: 'Completed' },
    { month: 'April 2026', amount: 1100, bookings: 3, payout: 'Completed' },
  ]

  return (
    <div className="space-y-8">
      <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-2xl p-8">
        <h1 className="text-4xl font-black text-brand-primary mb-2">Earnings 💰</h1>
        <p className="text-brand-earth">Track your income and payouts</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="backdrop-blur-sm bg-gradient-to-br from-brand-primary/10 to-brand-sage/10 border border-brand-primary/20 rounded-xl p-6">
          <p className="text-sm text-brand-earth mb-2">Total Earnings</p>
          <p className="text-3xl font-black text-brand-primary">A$4,250</p>
        </div>
        <div className="backdrop-blur-sm bg-gradient-to-br from-brand-secondary/10 to-brand-tertiary/10 border border-brand-secondary/20 rounded-xl p-6">
          <p className="text-sm text-brand-earth mb-2">This Month</p>
          <p className="text-3xl font-black text-brand-secondary">A$1,200</p>
        </div>
        <div className="backdrop-blur-sm bg-gradient-to-br from-brand-accent/10 to-brand-earth/10 border border-brand-accent/20 rounded-xl p-6">
          <p className="text-sm text-brand-earth mb-2">Next Payout</p>
          <p className="text-3xl font-black text-brand-accent">A$1,200</p>
        </div>
      </div>

      <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-brand-primary/10 flex justify-between items-center">
          <h2 className="text-2xl font-black text-brand-primary">Monthly Statement 📊</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg font-semibold hover:shadow-lg transition">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-primary/5 border-b border-brand-primary/10">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-brand-primary">Month</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-brand-primary">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-brand-primary">Bookings</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-brand-primary">Payout Status</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((item, i) => (
                <tr key={i} className="border-b border-brand-primary/5">
                  <td className="px-6 py-4 text-brand-primary font-semibold">{item.month}</td>
                  <td className="px-6 py-4 text-brand-primary font-bold">A${item.amount}</td>
                  <td className="px-6 py-4 text-brand-earth">{item.bookings} bookings</td>
                  <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">{item.payout}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
