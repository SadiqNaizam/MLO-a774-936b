import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Search } from 'lucide-react';

interface TransactionRow {
  id: string;
  date: string;
  description: string;
  amount: number;
  isDebit: boolean;
  runningBalance: number;
}

const ITEMS_PER_PAGE = 10;

// Extended sample transactions for history
const allTransactions: TransactionRow[] = Array.from({ length: 53 }, (_, i) => {
    const isDebit = Math.random() > 0.5;
    const amount = parseFloat((Math.random() * (isDebit ? 200 : 1000)).toFixed(2));
    return {
        id: `tx_hist_${i + 1}`,
        date: `2024-${String(Math.floor(i/15) + 5).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`, // Spread across few months
        description: `Transaction ${i + 1} ${isDebit ? 'Payment' : 'Deposit'} for ${['Groceries', 'Utilities', 'Salary', 'Online Order', 'Transfer'][i % 5]}`,
        amount: amount,
        isDebit: isDebit,
        runningBalance: 5000 - (i * 10) + (isDebit ? -amount : amount), // Simplified running balance
    };
}).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());


const FullTransactionHistoryPage = () => {
  console.log('FullTransactionHistoryPage loaded');
  const navigate = useNavigate();
  const location = useLocation();
  const { accountId } = location.state || { accountId: 'N/A' }; // Get accountId if passed

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all'); // e.g., 'all', 'last7days', 'last30days', 'custom'
  const [typeFilter, setTypeFilter] = useState('all'); // e.g., 'all', 'debit', 'credit'
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    return allTransactions
      .filter(tx => tx.description.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(tx => {
        if (dateFilter === 'all') return true;
        // Add actual date filtering logic here if needed
        return true;
      })
      .filter(tx => {
        if (typeFilter === 'all') return true;
        if (typeFilter === 'debit') return tx.isDebit;
        if (typeFilter === 'credit') return !tx.isDebit;
        return true;
      });
  }, [searchTerm, dateFilter, typeFilter]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Max number of page links to show (e.g., 1, 2, ..., 5, 6, 7, ..., 10, 11)
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1); // Always show first page
      if (currentPage > halfMaxPages + 1 && totalPages > maxPagesToShow) {
        pageNumbers.push(-1); // Ellipsis for start
      }

      let startPage = Math.max(2, currentPage - halfMaxPages + (currentPage < totalPages - halfMaxPages +1 ? 1: maxPagesToShow - (totalPages - currentPage) -1 ));
      let endPage = Math.min(totalPages - 1, currentPage + halfMaxPages - (currentPage > halfMaxPages ? 1: maxPagesToShow - currentPage));
      
      if (currentPage <= halfMaxPages) {
        endPage = Math.min(totalPages-1, maxPagesToShow-1);
      }
      if (currentPage > totalPages - halfMaxPages) {
        startPage = Math.max(2, totalPages - maxPagesToShow +2)
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - halfMaxPages && totalPages > maxPagesToShow) {
         pageNumbers.push(-2); // Ellipsis for end
      }
      pageNumbers.push(totalPages); // Always show last page
    }
    return pageNumbers;
  };


  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title={`Transaction History ${accountId !== 'N/A' ? `(Account ${accountId.slice(-4)})` : ''}`} showBackButton={true} onBackButtonClick={() => navigate(-1)} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/accounts-dashboard')}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Transaction History</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6 p-4 bg-white rounded-lg shadow space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="relative flex-grow md:mr-4 mb-4 md:mb-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              className="pl-10 w-full"
            />
          </div>
          <div className="flex space-x-4">
            <Select value={dateFilter} onValueChange={(value) => {setDateFilter(value); setCurrentPage(1);}}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={(value) => {setTypeFilter(value); setCurrentPage(1);}}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="debit">Debits (Money Out)</SelectItem>
                <SelectItem value="credit">Credits (Money In)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <ScrollArea className="bg-white rounded-lg shadow">
          <Table>
            <TableCaption>A list of your recent transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Running Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell className={`text-right font-semibold ${tx.isDebit ? 'text-red-600' : 'text-green-600'}`}>
                      {tx.isDebit ? '-' : '+'}£{tx.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right hidden sm:table-cell">£{tx.runningBalance.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">No transactions found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === -1 || page === -2 ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FullTransactionHistoryPage;