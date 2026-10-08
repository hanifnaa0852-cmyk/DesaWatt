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
import { RingkasanWilayah } from './pages/RingkasanWilayah';
import { GuidedTour } from './components/GuidedTour';

function MainApp() {
  const { isPublicPortal, isAuthenticated, activePage, isSidebarCollapsed } = useDesaWatt();

  // If in Citizen Transparency Portal view: Standalone public interface without sidebar
  if (isPublicPortal) {
    return <PortalWarga />;
  }

  // Initial landing experience: If not authenticated, show LoginPage first
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const paddingLeftClass = isSidebarCollapsed
    ? 'pl-[68px]'
    : 'pl-[68px] min-[1100px]:pl-[220px] 2xl:pl-[260px]';

  return (
    <div className="min-h-screen w-full max-w-full bg-[#E4E8D6] text-[#3A4728] flex relative overflow-x-hidden selection:bg-[#4B5D2A] selection:text-[#F7F8EE] font-sans print:bg-white print:p-0">
      {/* Interactive Guided Tour for New & Existing Users */}
      <GuidedTour />

      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area with responsive sidebar offset and min-w-0 */}
      <div className={`min-w-0 flex-1 flex flex-col min-h-screen ${paddingLeftClass} transition-all duration-300 w-full overflow-x-hidden print:pl-0 print:m-0 print:w-full`}>
        <TopBar />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full overflow-x-hidden print:p-0 print:m-0">
          {activePage === 'beranda' && <Beranda />}
          {activePage === 'baca-desa' && <BacaDesa />}
          {activePage === 'rancang-watt' && <RancangWatt />}
          {activePage === 'gerbang-keputusan' && <GerbangKeputusan />}
          {activePage === 'jaga-watt' && <JagaWatt />}
          {activePage === 'ringkasan-wilayah' && <RingkasanWilayah />}
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
