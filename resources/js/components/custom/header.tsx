import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

interface NavigationItem {
  id: string;
  label: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isHeaderBlurred, setIsHeaderBlurred] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [showEagle, setShowEagle] = useState<boolean>(false);
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());

  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const revealRefs = useRef<HTMLElement[]>([]);

  // Scroll handling for header blur and scroll-to-top button
  useEffect(() => {
    const handleScroll = (): void => {
      setIsHeaderBlurred(window.scrollY > 10);
      
      // Check if hero is visible for scroll-to-top button
      if (heroRef.current) {
        const heroRect: DOMRect = heroRef.current.getBoundingClientRect();
        setShowScrollTop(heroRect.bottom < window.innerHeight * 0.5);
      }

      // Active section detection
      const sections: NodeListOf<Element> = document.querySelectorAll('section[id]');
      let currentSection: string = 'home';
      
      sections.forEach((section: Element) => {
        const rect: DOMRect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          const sectionId: string | null = section.getAttribute('id');
          if (sectionId) {
            currentSection = sectionId;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for eagle background
  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          setShowEagle(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection observer for reveal animations
  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            const index: number = revealRefs.current.indexOf(entry.target as HTMLElement);
            setVisibleElements(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -15% 0px' }
    );

    revealRefs.current.forEach((ref: HTMLElement) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string): void => {
  const element: HTMLElement | null = document.getElementById(sectionId);
  if (element) {
    const headerHeight: number = 64; // your fixed header height
    const y: number =
      element.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }
  setIsMenuOpen(false);
};


  const addToRevealRefs = (el: HTMLElement | null): void => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  
  return (
<header className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isHeaderBlurred 
          ? 'bg-white/40 backdrop-blur-lg shadow-lg' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-screen-xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img src="/images/usep.png" alt="USEP logo" className="w-full h-full object-cover" />
            </div>
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
              <img src="/images/uagc.jpg" alt="UAGC logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[#E59C24] font-semibold text-sm leading-tight">UAGC System</div>
              <div className="text-red-600 text-xs leading-tight">Appointment Platform</div>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className={`w-6 h-0.5 bg-gray-900 transition-transform duration-200 ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`} />
            <span className={`w-6 h-0.5 bg-gray-900 transition-opacity duration-200 ${
              isMenuOpen ? 'opacity-0' : ''
            }`} />
            <span className={`w-6 h-0.5 bg-gray-900 transition-transform duration-200 ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`} />
          </button>

          {/* Navigation */}
          <nav className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex fixed md:static top-16 md:top-0 left-0 right-0 md:left-auto md:right-auto bg-white md:bg-transparent flex-col md:flex-row md:items-center gap-0 md:gap-8 border-b md:border-b-0 border-gray-200 md:border-transparent h-auto md:h-full`}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'guide', label: 'Guidance & Counselling' },
              { id: 'test', label: 'Psychological Test' },
              { id: 'refer', label: 'Referrals' }
            ].map(({ id, label }: NavigationItem) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-4 py-4 md:py-0 md:h-16 text-center md:flex md:items-center font-medium transition-all duration-300 border-l-4 md:border-l-0 md:border-b-2 cursor-pointer ${
                  activeSection === id
                    ? 'text-gray-900 border-red-600 bg-gray-50 md:bg-transparent'
                    : 'text-gray-500 border-transparent hover:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent'
                }`}
              >
                {label}
              </button>
            ))}
            <Link href={route('login')} className="bg-red-600 text-white text-center px-4 py-2 mx-4 my-4 md:my-0 md:mx-0 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300">
              Login
            </Link>
          </nav>

          {/* Header Right (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right text-sm text-gray-500">
              <div>Systems and Data</div>
              <div>Management Division</div>
            </div>
            <img src="/images/sdmd.png" alt="SDMD" className="w-12 h-12" />
          </div>
        </div>
      </header>  )
}

export default Header