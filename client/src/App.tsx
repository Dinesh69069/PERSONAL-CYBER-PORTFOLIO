import { useEffect, useState, Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Cursor from "./components/Cursor";
const Portfolio = lazy(() => import("./pages/Portfolio"));
const NotFound = lazy(() => import("@/pages/not-found"));
import ErrorBoundary from "./components/ErrorBoundary";
const LoadingScreen = lazy(() => import("./components/LoadingScreen"));
const Chatbot = lazy(() => import("./components/Chatbot"));

function Router() {
  return (
    <Switch>
      <Route path="/PERSONAL-CYBER-PORTFOLIO/" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Disable default cursor and set up scanline effect
  useEffect(() => {
    document.body.style.cursor = "none";
    
    // Add error tracking
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Global error:', { message, source, lineno, colno, error });
      return false;
    };
    
    // Create scanline effect
    const scanline = document.createElement("div");
    scanline.classList.add("scanline");
    document.body.appendChild(scanline);
    
    // Allow loading screen to complete its sequence
    // Loading screen will control when to hide itself via setIsLoading
    
    return () => {
      document.body.style.cursor = "auto";
      if (document.body.contains(scanline)) {
        document.body.removeChild(scanline);
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Cursor />
          <Suspense fallback={<LoadingScreen />}>
            {isLoading ? (
              <LoadingScreen setIsLoading={setIsLoading} />
            ) : (
              <>
                <Router />
                <Chatbot />
              </>
            )}
          </Suspense>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
