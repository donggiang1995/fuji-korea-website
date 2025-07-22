import React, { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/language-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Products from "@/pages/products";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import { useAdmin } from "@/hooks/useAdmin";

function AdminRouter() {
  const { isAuthenticated, isLoading, login, logout } = useAdmin();

  const handleLoginSuccess = (sessionId: string) => {
    login(sessionId);
  };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[hsl(var(--fuji-blue))]"></div>
          <p className="mt-4 text-slate-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/admin" component={() => <AdminRouter />} />
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/products" component={Products} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Switch>
            <Route path="/admin" component={() => <AdminRouter />} />
            <Route>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/products" component={Products} />
                    <Route path="/contact" component={Contact} />
                    <Route component={NotFound} />
                  </Switch>
                </main>
                <Footer />
              </div>
            </Route>
          </Switch>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
