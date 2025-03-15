"use client"

import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Car, Pizza, TrendingUp, Wallet, Plus, Send, Ellipsis } from "lucide-react";
import React from "react";

const transactions = [
  {
    name: "Credit Card Payment",
    date: "12 Jun, 2024",
    amount: "$14,92.33",
    type: "Expanse",
    account: "Bank of America",
    icon: <CreditCard />,
    iconColor: "text-yellow-500"
  },
  {
    name: "Car payment",
    date: "12 Jun, 2024",
    amount: "$14,92.33",
    type: "Sallary",
    account: "Bank of America",
    icon: <Car />,
    iconColor: "text-purple-500"
  },
  {
    name: "Pizza with",
    date: "12 Jun, 2024",
    amount: "$14,92.33",
    type: "Sallary",
    account: "Bank of America",
    icon: <Pizza />,
    iconColor: "text-blue-500"
  },
]

export default function Home() {
  const [progress, setProgress] = React.useState(75)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      <div className="border lg:col-span-2 p-6 space-y-4 rounded-xl">
        <h4 className="font-bold text-xl text-white">Transactions</h4>
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <tr>
              <TableHead className="uppercase text-xs">NAME</TableHead>
              <TableHead className="uppercase text-xs">DATE</TableHead>
              <TableHead className="uppercase text-xs">AMOUNT</TableHead>
              <TableHead className="uppercase text-xs">TYPE</TableHead>
              <TableHead className="uppercase text-xs">ACCOUNT</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.name} className="hover:bg-transparent">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-md ${transaction.iconColor}`}>
                      {transaction.icon}
                    </div>
                    <span>{transaction.name}</span>
                  </div>
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${transaction.type === "Expanse" ? "bg-red-500" : transaction.type === "Sallary" ? "bg-green-500" : ""}`}></div>
                    <span>{transaction.type}</span>
                  </div>
                </TableCell>
                <TableCell>{transaction.account}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-4 justify-center border bg-gradient-to-tr from-transparent to-teal-950/30 rounded-xl p-6">
        <div className="flex justify-between items-center">
          <span>Accounts Overview</span>
          <Wallet />
        </div>
        <div>
          <h2 className="text-white font-bold text-2xl">$6.446,500</h2>
          <span>Total balance across all accounts</span>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <span>Checking</span>
            <p className="text-white">$7.500</p>
          </div>
          <div className="flex justify-between items-center">
            <span>Savings</span>
            <p className="text-white">$560.000</p>
          </div>
          <div className="flex justify-between items-center">
            <span>Investiment</span>
            <p className="text-white">$5.879,000</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="border border-teal-500 rounded-md text-teal-500 text-sm flex items-center justify-center gap-2 py-1"> <Plus className="w-4 h-4"/> Add</button>
          <button className="border border-teal-500 rounded-md text-teal-500 text-sm flex items-center justify-center gap-2 py-1"> <Send className="w-4 h-4"/> Send</button>
          <button className="border border-teal-500 rounded-md text-teal-500 text-sm flex items-center justify-center gap-2 py-1"> <CreditCard className="w-4 h-4"/> Request</button>
          <button className="border border-teal-500 rounded-md text-teal-500 text-sm flex items-center justify-center gap-2 py-1"> <Ellipsis className="w-4 h-4"/> More</button>
        </div>
      </div>
      <div className="border lg:col-span-2">objectives</div>
      <div className="border">other</div>
      <div className="border lg:col-span-2 p-6 gap-4 rounded-xl flex flex-col">
        <h4>Goal</h4>
        <div className="flex justify-between">
          <h3 className="text-white">Honda Civic 2025</h3>
          <TrendingUp />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-xs px-2 py-1 bg-cyan-950 text-cyan-300 rounded-full">On Track</span>
            <span>$74.000 / $100.000</span>
          </div>
          <div>
            <Progress value={progress} className="w-full" />
          </div>
          <div className="flex justify-between">
            <span>$100.000</span>
            <span>75% Complete</span>
          </div>
        </div>
      </div>
      <div className="border">other 2</div>
    </main>
  );
}
