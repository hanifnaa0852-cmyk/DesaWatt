import React from 'react';
import { DesaWattProvider, useDesaWatt } from './context/DesaWattContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { Beranda } from './pages/Beranda';
import { BacaDesa } from './pages/BacaDesa';
import { RancangWatt } from './pages/RancangWatt';
import { GerbangKeputusan } from './pages/GerbangKeputusan';
import { JagaWatt } from './pages/JagaWatt';
import { PortalWarga } from './pages/PortalWarga';
import { LoginPage } from './pages/LoginPage';

function MainApp() {
  const { isPublicPortal, isAuthenticated, activePage } = useDesaWatt();

  // If in Citizen Transparency Portal view: Standalone public interface without sidebar (accessible with or without login)
  if (isPublicPortal) {
    return <PortalWarga />;
  }

  // Initial landing experience: If not authenticated, show LoginPage first
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#F6F8F7] text-[#334155] flex relative overflow-x-hidden selection:bg-[#147A4B] selection:text-white font-sans">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="pl-[260px] flex-1 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-6 lg:p-8">
          {activePage === 'beranda' && <Beranda />}
          {activePage === 'baca-desa' && <BacaDesa />}
          {activePage === 'rancang-watt' && <RancangWatt />}
          {activePage === 'gerbang-keputusan' && <GerbangKeputusan />}
          {activePage === 'jaga-watt' && <JagaWatt />}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DesaWattProvider>
      <MainApp />
    </DesaWattProvider>
  );
}
