import React from "react";
import HomeLayout from "../Layout/HomeLayout";

const User = () => {
  const transactions = [
    { description: "Payment from Bonnie Green", date: "Apr 23, 2021", amount: "$2300", status: "Completed" },
    { description: "Payment refund to #00910", date: "Apr 23, 2021", amount: "-$670", status: "Completed" },
    { description: "Payment failed from #087651", date: "Apr 18, 2021", amount: "$234", status: "Cancelled" },
    { description: "Payment from Lana Byrd", date: "Apr 15, 2021", amount: "$5000", status: "In progress" },
    { description: "Payment from Jese Leos", date: "Apr 15, 2021", amount: "$2300", status: "Completed" },
    { description: "Payment from THEMESBERG LLC", date: "Apr 11, 2021", amount: "$560", status: "Completed" },
    { description: "Payment from Lana Lysle", date: "Apr 6, 2021", amount: "$1437", status: "Completed" },
    { description: "Payment to Joseph Mcfall", date: "Apr 1, 2021", amount: "$980", status: "Completed" },
    { description: "Payment from Alphabet LLC", date: "Mar 23, 2021", amount: "$11,436", status: "In progress" },
    { description: "Payment from Bonnie Green", date: "Mar 23, 2021", amount: "$560", status: "Completed" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "In progress":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <HomeLayout>
        <div className=" mt-14 lg:ml-auto w-full lg:w-[94%] bg-white p-6 rounded-lg ">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Manage User</h2>
        <p className="text-sm text-gray-500">This is a list of latest transactions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left text-sm font-semibold text-gray-500 px-4 py-3">Transaction</th>
              <th className="text-left text-sm font-semibold text-gray-500 px-4 py-3">Date & Time</th>
              <th className="text-left text-sm font-semibold text-gray-500 px-4 py-3">Amount</th>
              <th className="text-left text-sm font-semibold text-gray-500 px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-3 text-sm text-gray-700">{transaction.description}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{transaction.date}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-700">{transaction.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${getStatusClass(transaction.status)}`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <a
          href="#"
          className="text-purple-600 hover:underline text-sm font-medium"
        >
          View all
        </a>
      </div>
    </div>
    </HomeLayout>
  );
};

export default User;
