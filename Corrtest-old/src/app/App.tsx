import { BrowserRouter, Routes, Route } from 'react-router';
import { Navigation } from './components/Navigation';
import { Overview } from './pages/Overview';
import { ProductPricing } from './pages/ProductPricing';
import { LoanTrading } from './pages/LoanTrading';
import { Analytics } from './pages/Analytics';
import { AIInsights } from './pages/AIInsights';
import { Integrations } from './pages/Integrations';
import { Admin } from './pages/Admin';
import { Support } from './pages/Support';

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex bg-background overflow-hidden">
        <Navigation />
        <main className="flex-1 overflow-auto min-w-0">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/product-pricing" element={<ProductPricing />} />
            <Route path="/loan-trading" element={<LoanTrading />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai-insights" element={<AIInsights />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
