
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  // Add background grid pattern
  useEffect(() => {
    // Add a CSS class to the body for the background pattern
    document.body.classList.add('bg-grid-pattern');

    return () => {
      document.body.classList.remove('bg-grid-pattern');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        {/* Additional sections can be added here */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
