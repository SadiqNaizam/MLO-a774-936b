import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Transaction } from '@/components/TransactionListItem'; // Assuming Transaction type is exported from here or a shared types file

// Sample transactions for the account summary cards
const sampleTransactions1: Transaction[] = [
  { id: 'tx1', date: '2024-07-28', description: 'Tesco Groceries', amount: 55.20, isDebit: true },
  { id: 'tx2', date: '2024-07-27', description: 'Salary', amount: 2500.00, isDebit: false },
  { id: 'tx3', date: '2024-07-26', description: 'Coffee Shop', amount: 3.50, isDebit: true },
];

const sampleTransactions2: Transaction[] = [
  { id: 'tx4', date: '2024-07-28', description: 'Book Purchase', amount: 12.99, isDebit: true },
  { id: 'tx5', date: '2024-07-25', description: 'Refund from Amazon', amount: 25.50, isDebit: false },
];

const AccountsDashboardPage = () => {
  console.log('AccountsDashboardPage loaded');
  const navigate = useNavigate();

  const handleMoveMoney = (accountId: string) => {
    console.log(`Move money initiated for account: ${accountId}`);
    navigate('/move-money', { state: { accountId } }); // Pass accountId for pre-selection
  };

  const handleViewStatement = (accountId: string) => {
    console.log(`View statement for account: ${accountId}`);
    navigate('/transaction-history', { state: { accountId } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title="My Accounts" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ScrollArea className="h-full">
          <div className="space-y-6">
            <AccountSummaryCard
              accountName="Spend & Save"
              accountSortCode="01-02-03"
              accountNumber="12345678"
              balance={1250.75}
              currencySymbol="£"
              recentTransactions={sampleTransactions1}
              onMoveMoneyClick={() => handleMoveMoney('12345678')}
              onViewStatementClick={() => handleViewStatement('12345678')}
            />
            <AccountSummaryCard
              accountName="Savings Account"
              accountSortCode="04-05-06"
              accountNumber="87654321"
              balance={5820.00}
              currencySymbol="£"
              recentTransactions={sampleTransactions2}
              onMoveMoneyClick={() => handleMoveMoney('87654321')}
              onViewStatementClick={() => handleViewStatement('87654321')}
            />
             {/* Add more AccountSummaryCard instances as needed */}
          </div>
        </ScrollArea>
      </main>
      <Footer />
    </div>
  );
};

export default AccountsDashboardPage;