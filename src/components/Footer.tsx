
import { Github, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/src/assets/logo.svg" alt="SignaLink Logo" className="h-8 w-8" />
              <span className="font-semibold text-lg">SignaLink</span>
            </div>
            <p className="text-sm text-foreground/70">
              Breaking barriers in communication with real-time Indian Sign Language translation technology.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-border">
          <p className="text-center text-sm text-foreground/60">
            © {currentYear} SignaLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
