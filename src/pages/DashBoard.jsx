import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function DashboardPage() {
  const [income, setIncome] = useState(0);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleAddIncome = (e) => {
    e.preventDefault();
    const amount = parseFloat(e.target.income.value);
    if (!isNaN(amount) && amount > 0) {
      setIncome(amount);
    }
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (!isNaN(amount) && amount > 0 && expenseTitle.trim()) {
      setExpenses([...expenses, { title: expenseTitle, amount }]);
      setExpenseTitle("");
      setExpenseAmount("");
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = income - totalExpenses;

  const barData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [income, totalExpenses],
        backgroundColor: ["#b29fda", "#f87171"],
      },
    ],
  };

  const doughnutData = {
    labels: expenses.map((exp) => exp.title),
    datasets: [
      {
        data: expenses.map((exp) => exp.amount),
        backgroundColor: [
          "#8E7AB5", "#B784B7", "#EEA5A6", "#D4E2D4", "#D2DAFF", "#AAC4FF"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F1F2F6] text-gray-800">
      {/* Navbar */}
      <nav className="bg-[#8E7AB5] text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Smart Budget Tracker Application</h1>
        <div className="flex gap-4">
          <span className="font-medium">Welcome, Aerth 👋</span>
          <button className="bg-white text-[#8E7AB5] px-3 py-1 rounded hover:bg-[#d2c3f3]">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Cards */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          {/* Total Income */}
          <div className="bg-white p-4 rounded shadow w-full sm:w-1/3 text-center">
            <h3 className="text-lg font-semibold text-[#3D52A0]">Total Income</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">₹ {income.toFixed(2)}</p>
          </div>

          {/* Total Expenses */}
          <div className="bg-white p-4 rounded shadow w-full sm:w-1/3 text-center">
            <h3 className="text-lg font-semibold text-[#3D52A0]">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">₹ {totalExpenses.toFixed(2)}</p>
          </div>

          {/* Remaining Balance */}
          <div className="bg-white p-4 rounded shadow w-full sm:w-1/3 text-center">
            <h3 className="text-lg font-semibold text-[#3D52A0]">Remaining Balance</h3>
            <p
              className={`text-2xl font-bold mt-2 ${
                remaining < 0
                  ? "text-red-600"
                  : remaining < income * 0.25
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              ₹ {remaining.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Forms */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <form onSubmit={handleAddIncome} className="mb-4">
            <label className="block mb-1 font-medium text-[#3D52A0]">Enter Income:</label>
            <input
              type="number"
              name="income"
              className="w-full border rounded p-2 mb-2"
              placeholder="e.g. 50000"
              required
            />
            <button type="submit" className="bg-[#8E7AB5] text-white px-4 py-2 rounded hover:bg-[#7a68a4]">
              Set Income
            </button>
          </form>

          <form onSubmit={handleAddExpense}>
            <label className="block mb-1 font-medium text-[#3D52A0]">Add Expense:</label>
            <input
              type="text"
              value={expenseTitle}
              onChange={(e) => setExpenseTitle(e.target.value)}
              className="w-full border rounded p-2 mb-2"
              placeholder="Expense title"
              required
            />
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              className="w-full border rounded p-2 mb-2"
              placeholder="Expense amount"
              required
            />
            <button type="submit" className="bg-[#B784B7] text-white px-4 py-2 rounded hover:bg-[#a672a3]">
              Add Expense
            </button>
          </form>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-center font-semibold mb-2 text-[#3D52A0]">Income vs Expenses</h3>
            <Bar data={barData} />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-center font-semibold mb-2 text-[#3D52A0]">Expense Breakdown</h3>
            <Doughnut data={doughnutData} />
          </div>
        </div>

        {/* Expense List */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2 text-[#3D52A0]">All Expenses</h3>
          <ul className="list-disc list-inside">
            {expenses.map((exp, index) => (
              <li key={index} className="flex justify-between">
                <span>{exp.title}</span>
                <span className="text-red-600 font-medium">₹ {exp.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#8E7AB5] text-white p-4 mt-8">
        <div className="text-center">
          <p className="mb-1">
            <a href="https://github.com/your-github" target="_blank" className="underline mx-1">
              GitHub
            </a>|
            <a href="https://linkedin.com/in/your-linkedin" target="_blank" className="underline mx-1">
              LinkedIn
            </a>
          </p>
          <p className="text-sm">© Aerth Saraogi</p>
        </div>
      </footer>
    </div>
  );
}
