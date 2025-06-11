import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Lock, Eye, AlertTriangle, CreditCard } from 'lucide-react';

const CardControlsManagementPage = () => {
  console.log('CardControlsManagementPage loaded');
  const navigate = useNavigate();
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [showPinReminderDialog, setShowPinReminderDialog] = useState(false);
  const [showReportLostDialog, setShowReportLostDialog] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title="Card Controls" showBackButton={true} onBackButtonClick={() => navigate(-1)} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/accounts-dashboard')}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Card Controls</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-6 w-6 text-blue-600" />
                Manage Your Card
            </CardTitle>
            <CardDescription>Control your debit card settings and security features.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <Lock className={`mr-3 h-5 w-5 ${isCardFrozen ? 'text-red-500' : 'text-green-500'}`} />
                <Label htmlFor="freeze-card" className="text-base">
                  {isCardFrozen ? 'Card Frozen' : 'Freeze Card'}
                </Label>
              </div>
              <Switch
                id="freeze-card"
                checked={isCardFrozen}
                onCheckedChange={setIsCardFrozen}
                aria-label="Freeze or unfreeze card"
              />
            </div>
            <p className="text-sm text-gray-500 px-1">
              {isCardFrozen
                ? 'Your card is currently frozen. Unfreeze to resume transactions.'
                : 'Temporarily freeze your card to prevent unauthorized use.'}
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Advanced Settings</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                   <p className="text-sm text-gray-600">More controls coming soon, like spending limits and online payment toggles.</p>
                  {/* Example: Online payment toggle */}
                  <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                    <Label htmlFor="online-payments" className="text-sm">Enable Online Payments</Label>
                    <Switch id="online-payments" defaultChecked disabled />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <Dialog open={showPinReminderDialog} onOpenChange={setShowPinReminderDialog}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <Eye className="mr-2 h-4 w-4" /> View PIN Reminder
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>PIN Reminder</DialogTitle>
                        <DialogDescription>
                            For security, your PIN will be displayed securely after authentication.
                            (This is a placeholder for the actual PIN display flow).
                        </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 text-center text-lg font-mono bg-gray-100 p-4 rounded">
                            **** (Secure PIN display area)
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={showReportLostDialog} onOpenChange={setShowReportLostDialog}>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                            <AlertTriangle className="mr-2 h-4 w-4" /> Report Lost/Stolen
                        Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Report Card Lost or Stolen</DialogTitle>
                        <DialogDescription>
                            Reporting your card will permanently block it and a new card will be issued.
                            Are you sure you want to proceed?
                        </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <Button type="button" variant="destructive" onClick={() => { console.log("Card Reported!"); setShowReportLostDialog(false); setIsCardFrozen(true); }}>
                                Yes, Report Card
                            </Button>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CardControlsManagementPage;