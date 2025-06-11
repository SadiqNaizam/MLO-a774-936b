import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { AlertCircle } from 'lucide-react';

const MoveMoneyInitiationPage = () => {
  console.log('MoveMoneyInitiationPage loaded');
  const navigate = useNavigate();
  const location = useLocation();
  const { accountId: sourceAccountId } = location.state || { accountId: 'default_account_id_if_none_passed' };

  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting transfer:', { from: sourceAccountId, to: toAccount, amount, reference });
    // Basic validation
    if (!toAccount || !amount) {
        setStatusMessage({ type: 'error', message: 'Please fill in "To Account" and "Amount".' });
        return;
    }
    // Simulate API call
    setStatusMessage({ type: 'success', message: 'Transfer initiated successfully!' });
    // Optionally navigate away or clear form
    // navigate('/accounts-dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title="Move Money" showBackButton={true} onBackButtonClick={() => navigate(-1)} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/accounts-dashboard')}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Move Money</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Initiate Transfer</CardTitle>
            <CardDescription>Enter the details for your transfer.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fromAccount">From Account</Label>
                <Select defaultValue={sourceAccountId} disabled>
                  <SelectTrigger id="fromAccount">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default_account_id_if_none_passed">Spend & Save (**** {sourceAccountId.slice(-4)})</SelectItem>
                    {/* Populate with actual accounts if needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="toAccount">To Account (Sort Code & Account No.)</Label>
                <Input
                  id="toAccount"
                  placeholder="e.g., 00-00-00 12345678"
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (£)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Reference (Optional)</Label>
                <Input
                  id="reference"
                  placeholder="e.g., Rent payment"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
              {statusMessage && (
                <Alert variant={statusMessage.type === 'error' ? 'destructive' : 'default'}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{statusMessage.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
                  <AlertDescription>{statusMessage.message}</AlertDescription>
                </Alert>
              )}
               <CardFooter className="pt-6 px-0">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Confirm Transfer
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default MoveMoneyInitiationPage;