import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TransactionListItem, { Transaction } from './TransactionListItem'; // Import the new component and its type
import { ChevronDown } from 'lucide-react';

interface AccountSummaryCardProps {
  accountName: string;
  accountSortCode?: string; // Optional
  accountNumber: string;
  balance: number;
  currencySymbol?: string;
  recentTransactions?: Transaction[];
  onMoveMoneyClick: () => void;
  onViewStatementClick?: () => void; // Optional action
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountName,
  accountSortCode,
  accountNumber,
  balance,
  currencySymbol = '£',
  recentTransactions,
  onMoveMoneyClick,
  onViewStatementClick,
}) => {
  console.log("Rendering AccountSummaryCard for:", accountName);

  const formattedBalance = `${currencySymbol}${balance.toFixed(2)}`;
  const accountDetails = accountSortCode ? `${accountSortCode} | ${accountNumber}` : accountNumber;

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-slate-800">{accountName}</CardTitle>
            <CardDescription className="text-sm text-gray-600">{accountDetails}</CardDescription>
          </div>
          {/* Optional: Account type icon or badge */}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 uppercase">Balance on Account</p>
          <p className="text-3xl font-bold text-slate-900">{formattedBalance}</p>
        </div>

        {recentTransactions && recentTransactions.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="recent-activity">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-2">
                <div className="flex items-center">
                  Recent Activity
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 ml-1" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-0">
                {/* Max height and scroll for many transactions */}
                <div className="max-h-48 overflow-y-auto pr-2">
                    {recentTransactions.map((tx) => (
                    <TransactionListItem
                        key={tx.id}
                        {...tx}
                        currencySymbol={currencySymbol}
                    />
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100">
        <Button
          onClick={onMoveMoneyClick}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white" // TSB Primary Blue (example)
        >
          Move money
        </Button>
        {onViewStatementClick && (
          <Button
            variant="outline"
            onClick={onViewStatementClick}
            className="w-full sm:w-auto"
          >
            View statement
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AccountSummaryCard;