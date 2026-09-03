import { useEffect, useState } from 'react';
import type { ScreenId } from '@/types';
import { NavBar } from '@/components/NavBar';
import { LandingPage } from '@/screens/LandingPage';
import { ConnectPage } from '@/screens/ConnectPage';
import { RawDataPage } from '@/screens/RawDataPage';
import { VolatilityPage } from '@/screens/VolatilityPage';
import { PredictivePage } from '@/screens/PredictivePage';
import { BufferTargetPage } from '@/screens/BufferTargetPage';
import { ContributionPage } from '@/screens/ContributionPage';
import { AutomationPage } from '@/screens/AutomationPage';
import { ShockPage } from '@/screens/ShockPage';
import { ShockModePage } from '@/screens/ShockModePage';
import { DebtFirewallPage } from '@/screens/DebtFirewallPage';
import { RecoveryPage } from '@/screens/RecoveryPage';
import { ComparisonPage } from '@/screens/ComparisonPage';

function App() {
  const [screen, setScreen] = useState<ScreenId>('landing');
  const [bufferContribution, setBufferContribution] = useState(0);
  const [shockActive, setShockActive] = useState(false);

  const navigate = (s: ScreenId) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setShockActive(screen === 'shock-mode');
  }, [screen]);

  const renderScreen = () => {
    switch (screen) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      case 'connect':
        return <ConnectPage onNavigate={navigate} />;
      case 'raw-data':
        return <RawDataPage onNavigate={navigate} />;
      case 'volatility':
        return <VolatilityPage onNavigate={navigate} />;
      case 'predictive':
        return <PredictivePage onNavigate={navigate} />;
      case 'buffer-target':
        return <BufferTargetPage onNavigate={navigate} />;
      case 'contribution':
        return (
          <ContributionPage
            onNavigate={navigate}
            bufferContribution={bufferContribution}
            setBufferContribution={setBufferContribution}
          />
        );
      case 'automation':
        return <AutomationPage onNavigate={navigate} />;
      case 'shock':
        return <ShockPage onNavigate={navigate} bufferContribution={bufferContribution} />;
      case 'shock-mode':
        return <ShockModePage onNavigate={navigate} bufferContribution={bufferContribution} />;
      case 'debt-firewall':
        return <DebtFirewallPage onNavigate={navigate} bufferContribution={bufferContribution} />;
      case 'recovery':
        return <RecoveryPage onNavigate={navigate} bufferContribution={bufferContribution} />;
      case 'comparison':
        return <ComparisonPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-mist-50">
      <NavBar current={screen} onNavigate={navigate} shockActive={shockActive} />
      <main>{renderScreen()}</main>
      <footer className="border-t border-mist-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-ink-400">
          BufferX — A financial shock absorber for irregular income. Prototype for hackathon demonstration. All APIs are simulated.
        </div>
      </footer>
    </div>
  );
}

export default App;
