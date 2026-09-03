import { useState, useEffect } from 'react';
import { Landmark, Bike, FileSpreadsheet, Check, Loader2, Lock, ArrowRight, Shield } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card, Badge, SectionLabel } from '@/components/ui';

type ConnState = 'idle' | 'connecting' | 'connected';

export function ConnectPage({ onNavigate }: { onNavigate: (s: ScreenId) => void }) {
  const [bank, setBank] = useState<ConnState>('idle');
  const [gig, setGig] = useState<ConnState>('idle');
  const [demo, setDemo] = useState<ConnState>('idle');
  const [connectedAt, setConnectedAt] = useState(false);

  const allConnected = bank === 'connected' && gig === 'connected' && demo === 'connected';

  const connect = (setter: (s: ConnState) => void) => {
    setter('connecting');
    setTimeout(() => {
      setter('connected');
      setConnectedAt(true);
    }, 1800);
  };

  // Auto-connect demo profile button is primary path
  const quickDemo = () => {
    setBank('connecting');
    setGig('connecting');
    setDemo('connecting');
    setTimeout(() => {
      setBank('connected');
    }, 1200);
    setTimeout(() => {
      setGig('connected');
    }, 1800);
    setTimeout(() => {
      setDemo('connected');
      setConnectedAt(true);
    }, 2400);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <SectionLabel>Step 1 — Data Connection</SectionLabel>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold font-display text-ink-900">Connect Your Income</h1>
        <p className="mt-3 text-lg text-ink-500 max-w-xl mx-auto">BufferX analyses your income history to build a personalized safety buffer. All integrations are simulated for this demo.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-6">
        {/* Bank */}
        <Card className={`p-6 flex flex-col gap-4 transition-all ${bank === 'connected' ? 'ring-2 ring-shield-400' : ''}`}>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-ink-900 text-lg">Bank / Account Aggregator</h3>
            <p className="text-sm text-ink-500 mt-1">Analyse incoming transactions and recurring financial behaviour.</p>
          </div>
          <div className="mt-auto">
            {bank === 'idle' && <Button variant="secondary" className="w-full" onClick={() => connect(setBank)}>Connect Demo Bank</Button>}
            {bank === 'connecting' && <div className="flex items-center justify-center gap-2 text-ink-500 text-sm font-medium py-3"><Loader2 className="w-4 h-4 animate-spin" /> Fetching...</div>}
            {bank === 'connected' && <div className="flex items-center gap-2 text-shield-600 text-sm font-semibold py-3"><Check className="w-5 h-5" /> Data Connected</div>}
          </div>
          <Badge tone="info">Demo API Integration</Badge>
        </Card>

        {/* Gig */}
        <Card className={`p-6 flex flex-col gap-4 transition-all ${gig === 'connected' ? 'ring-2 ring-shield-400' : ''}`}>
          <div className="w-12 h-12 rounded-xl bg-vol-50 text-vol-600 flex items-center justify-center">
            <Bike className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-ink-900 text-lg">Gig Platform Earnings</h3>
            <p className="text-sm text-ink-500 mt-1">Analyse daily gig earnings and earning frequency.</p>
          </div>
          <div className="mt-auto">
            {gig === 'idle' && <Button variant="secondary" className="w-full" onClick={() => connect(setGig)}>Connect Demo Earnings</Button>}
            {gig === 'connecting' && <div className="flex items-center justify-center gap-2 text-ink-500 text-sm font-medium py-3"><Loader2 className="w-4 h-4 animate-spin" /> Fetching...</div>}
            {gig === 'connected' && <div className="flex items-center gap-2 text-shield-600 text-sm font-semibold py-3"><Check className="w-5 h-5" /> Data Connected</div>}
          </div>
          <Badge tone="info">Demo API Integration</Badge>
        </Card>

        {/* Demo */}
        <Card className={`p-6 flex flex-col gap-4 transition-all ${demo === 'connected' ? 'ring-2 ring-shield-400' : ''}`}>
          <div className="w-12 h-12 rounded-xl bg-shield-50 text-shield-600 flex items-center justify-center">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-ink-900 text-lg">Manual Demo Dataset</h3>
            <p className="text-sm text-ink-500 mt-1">Load Arun's historical income for hackathon demonstration.</p>
          </div>
          <div className="mt-auto">
            {demo === 'idle' && <Button className="w-full" onClick={quickDemo}>Use Demo Profile</Button>}
            {demo === 'connecting' && <div className="flex items-center justify-center gap-2 text-ink-500 text-sm font-medium py-3"><Loader2 className="w-4 h-4 animate-spin" /> Loading profile...</div>}
            {demo === 'connected' && <div className="flex items-center gap-2 text-shield-600 text-sm font-semibold py-3"><Check className="w-5 h-5" /> Profile Loaded</div>}
          </div>
          <Badge tone="shield">Recommended</Badge>
        </Card>
      </div>

      {/* Data connected summary */}
      {connectedAt && (
        <Card glow="shield" className="p-6 animate-scale-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-shield-100 text-shield-600 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-ink-900 text-lg">Data Connected</h3>
              <p className="text-sm text-ink-400">Arun Kumar — 6 months of income history loaded</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Months loaded', value: '6' },
              { label: 'Earning days', value: '154' },
              { label: 'Income sources', value: 'Identified' },
              { label: 'Recurring expenses', value: 'Detected' },
            ].map((item) => (
              <div key={item.label} className="bg-mist-50 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-ink-900">{item.value}</div>
                <div className="text-xs text-ink-400 mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Badge tone="shield"><Lock className="w-3 h-3" /> Powered by Secure API Layer — Demo</Badge>
            <Button onClick={() => onNavigate('raw-data')}>
              View Income Pattern <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {!connectedAt && (
        <div className="text-center">
          <Button size="lg" variant="dark" onClick={quickDemo}>
            <Shield className="w-5 h-5" /> Quick Connect All (Demo)
          </Button>
          <p className="text-sm text-ink-400 mt-3">Instantly load Arun's complete demo profile</p>
        </div>
      )}
    </div>
  );
}
