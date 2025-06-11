import React from 'react';
import { cn } from '@/lib/utils'; // For conditional class names

export interface Transaction {
  id: string;
  date: string; // Or Date object, format as needed
  description: string;
  amount: number;
  currencySymbol?: string;
  isDebit?: boolean; // true if money out, false if money in
}

const TransactionListItem: React.FC<Transaction> = ({
  date,
  description,
  amount,
  currencySymbol = '£',
  isDebit = true, // Default to debit
}) => {
  console.log("Rendering TransactionListItem:", description, amount);
  const formattedAmount = `${isDebit ? '-' : '+'}${currencySymbol}${Math.abs(amount).toFixed(2)}`;

  return (
    <div className="flex justify-between items-center py-3 px-1 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 pr-2">
        <p className="text-sm font-medium text-gray-800 truncate">{description}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <div
        className={cn(
          "text-sm font-semibold",
          isDebit ? "text-red-600" : "text-green-600"
        )}
      >
        {formattedAmount}
      </div>
    </div>
  );
};

export default TransactionListItem;