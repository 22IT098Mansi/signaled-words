
import { Button } from '@/components/ui/button';
import { ArrowRight, Video } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-4');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10"></div>
      
      <div 
        ref={heroRef} 
        className="container max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 transition-all duration-700 ease-out opacity-0 translate-y-4"
      >
        {/* Left content */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <div className="inline-block animate-fade-in">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Bridging Communication Gaps
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight animate-fade-in [animation-delay:200ms]">
              Real-time Indian Sign Language 
              <span className="text-gradient"> Translation</span>
            </h1>
            
            <p className="text-lg text-foreground/80 max-w-2xl animate-fade-in [animation-delay:400ms]">
              Breaking barriers in communication with cutting-edge technology that translates Indian Sign Language to text in real-time, creating a more inclusive world.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2 animate-fade-in [animation-delay:600ms]">
            <Button size="lg" className="gap-2 group">
              Try Translator <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Video className="h-4 w-4" /> Watch Demo
            </Button>
          </div>
          
          <div className="flex items-center gap-6 pt-6 animate-fade-in [animation-delay:800ms]">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                  <span className="text-xs font-medium">{i}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-foreground/70">
              <span className="font-semibold">1,000+</span> users already benefiting
            </p>
          </div>
        </div>
        
        {/* Right content - hero image */}
        <div className="flex-1 w-full max-w-xl animate-fade-in-right [animation-delay:400ms]">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-xl opacity-70 animate-pulse"></div>
            <div className="relative bg-white rounded-2xl p-2 shadow-xl">
              <img 
                src="/src/assets/hero.svg" 
                alt="ISL Translation Visualization" 
                className="w-full h-auto animate-float"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-3 animate-fade-in [animation-delay:1000ms]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Live Translation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
