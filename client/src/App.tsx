import { useEffect, useState, Suspense, lazy } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Cursor from "./components/Cursor";
const Portfolio = lazy(() => import("./pages/Portfolio"));
const NotFound = lazy(() => import("@/pages/not-found"));
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";
const Chatbot = lazy(() => import("./components/Chatbot"));

const routerBase = (() => {
  const [baseSegment] = window.location.pathname.split("/").filter(Boolean);
  return baseSegment ? `/${baseSegment}` : "/";
})();

function Router() {
  return (
    <WouterRouter base={routerBase}>
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Disable default cursor and set up scanline effect
  useEffect(() => {
    // Detect if device is mobile/tablet or has touch capability
    const isMobileOrTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };

    // Only hide cursor on desktop devices
    if (!isMobileOrTouch()) {
      document.body.style.cursor = "none";
    }
    
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
          <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
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
