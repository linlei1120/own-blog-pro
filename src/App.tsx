import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { DataProvider, usePortfolioData } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CinematicPreloader } from './components/CinematicPreloader';
import { QuickElevatorModal } from './components/QuickElevatorModal';
import { ResumeModal } from './components/ResumeModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ToolsPage } from './pages/ToolsPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

const MainLayout: React.FC = () => {
  const { activePage } = usePortfolioData();
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'articles':
        return <ArticlesPage />;
      case 'tools':
        return <ToolsPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08080a] text-[#f3f1ea] selection:bg-[#ff3b1d] selection:text-[#08080a]">
      {/* Cinematic Intro Preloader */}
      <CinematicPreloader onComplete={() => setPreloaderFinished(true)} />

      {/* Persistent Site Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 md:px-12 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <QuickElevatorModal />
      <ResumeModal />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <MainLayout />
    </DataProvider>
  );
}
