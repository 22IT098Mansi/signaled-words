
import { useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Users, CheckCircle, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: "Real-time Translation",
    description: "Our advanced computer vision technology translates Indian Sign Language gestures to text instantly.",
    image: "/src/assets/feature1.svg"
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Community Learning",
    description: "Join our community to learn ISL and contribute to improving the translation model.",
    image: "/src/assets/feature2.svg"
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: "High Accuracy",
    description: "Benefit from high accuracy translations, continually improved through machine learning.",
    image: "/src/assets/feature3.svg"
  }
];

const Features = () => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            Features
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Breaking Communication Barriers
          </h2>
          <p className="text-lg text-foreground/70">
            Our platform offers innovative features designed to make sign language communication accessible to everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <CardDescription className="text-foreground/70 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <div className="px-6 pb-6">
                  <div className="bg-muted/30 rounded-lg p-4 flex justify-center">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="h-36 w-auto"
                    />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div 
          ref={(el) => (featureRefs.current[3] = el)}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 sm:p-12 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <h3 className="text-2xl font-bold">Ready to experience seamless translation?</h3>
              <p className="text-foreground/70">
                Start using our platform today and join thousands of users who are already breaking communication barriers.
              </p>
            </div>
            <Button size="lg" className="gap-2 group whitespace-nowrap">
              Get Started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
