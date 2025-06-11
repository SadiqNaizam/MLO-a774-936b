import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Settings, Bell, Edit3 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


const AccountSettingsPage = () => {
  console.log('AccountSettingsPage loaded');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { accountId } = location.state || { accountId: 'current_account' }; // Example: get account ID from state

  const [accountNickname, setAccountNickname] = useState('My Current Account');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving account settings:', { accountId, accountNickname, emailNotifications, smsNotifications });
    // Simulate API call
    toast({
      title: "Settings Saved",
      description: `Account settings for ${accountNickname} updated.`,
    });
    // Optionally navigate or give other feedback
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title="Account Settings" showBackButton={true} onBackButtonClick={() => navigate(-1)} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/accounts-dashboard')}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Account Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <form onSubmit={handleSaveChanges}>
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-6 w-6 text-blue-600" />
                Account Preferences ({accountId.slice(-4)})
              </CardTitle>
              <CardDescription>Manage your preferences for this account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <Accordion type="multiple" defaultValue={["general", "notifications"]} className="w-full">
                <AccordionItem value="general">
                  <AccordionTrigger className="text-lg font-semibold">
                    <Edit3 className="mr-2 h-5 w-5" /> General Settings
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountNickname">Account Nickname</Label>
                      <Input
                        id="accountNickname"
                        value={accountNickname}
                        onChange={(e) => setAccountNickname(e.target.value)}
                        placeholder="e.g., Holiday Fund"
                      />
                    </div>
                    {/* More general settings can go here */}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="notifications">
                  <AccordionTrigger className="text-lg font-semibold">
                    <Bell className="mr-2 h-5 w-5" /> Notification Preferences
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <Label htmlFor="emailNotifications" className="flex-grow">
                        Email Notifications
                        <p className="text-sm text-gray-500">Receive updates and alerts via email.</p>
                      </Label>
                      <Switch
                        id="emailNotifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <Label htmlFor="smsNotifications" className="flex-grow">
                        SMS Notifications
                        <p className="text-sm text-gray-500">Receive critical alerts via SMS.</p>
                      </Label>
                      <Switch
                        id="smsNotifications"
                        checked={smsNotifications}
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>
                     {/* More notification settings */}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="statements">
                  <AccordionTrigger className="text-lg font-semibold">
                    E-Statements
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4">
                     <p className="text-sm text-gray-600">Manage your e-statement preferences here.</p>
                     <Button variant="outline">View E-Statements</Button>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AccountSettingsPage;