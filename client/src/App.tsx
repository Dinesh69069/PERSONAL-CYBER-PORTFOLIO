import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Cursor from "./components/Cursor";
import Portfolio from "./pages/Portfolio";
import LoadingScreen from "./components/LoadingScreen";

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
    
    // Create scanline effect
    const scanline = document.createElement("div");
    scanline.classList.add("scanline");
    document.body.appendChild(scanline);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading screen
    
    return () => {
      document.body.style.cursor = "auto";
      if (document.body.contains(scanline)) {
        document.body.removeChild(scanline);
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading ? <LoadingScreen /> : (
          <>
            <Cursor />
            <Toaster />
            <Router />
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
