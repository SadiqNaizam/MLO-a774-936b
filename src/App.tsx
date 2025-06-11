import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // shadcn Sonner (usually for non-form toasts)
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your page components
import AccountsDashboardPage from "./pages/AccountsDashboardPage";
import MoveMoneyInitiationPage from "./pages/MoveMoneyInitiationPage";
import CardControlsManagementPage from "./pages/CardControlsManagementPage";
import FullTransactionHistoryPage from "./pages/FullTransactionHistoryPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* For shadcn Toasts (often used with forms) */}
      <Sonner /> {/* For shadcn Sonner (more general notifications) */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountsDashboardPage />} />
          <Route path="/accounts-dashboard" element={<AccountsDashboardPage />} />
          <Route path="/move-money" element={<MoveMoneyInitiationPage />} />
          <Route path="/card-controls" element={<CardControlsManagementPage />} />
          <Route path="/transaction-history" element={<FullTransactionHistoryPage />} />
          <Route path="/account-settings" element={<AccountSettingsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;