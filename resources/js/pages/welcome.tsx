  import Header from '@/components/custom/header';
  import { Link } from '@inertiajs/react';
  import React, { useState, useEffect, useRef } from 'react';

  // Types
  interface NavigationItem {
    id: string;
    label: string;
  }

  interface UAGCLandingPageProps {}

  const UAGCLandingPage: React.FC<UAGCLandingPageProps> = () => {
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
      <div className="min-h-screen bg-gray-50 pt-16 relative overflow-x-hidden">
        {/* Eagle Background */}
        <div 
          className={`fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-700 z-0 ${
            showEagle ? 'opacity-50' : 'opacity-0'
          }`}
          style={{ backgroundImage: "url('/images/eagle.jpg')" }}
        />

        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section id="home" ref={heroRef} className="relative py-16 md:py-24 lg:py-28 text-center text-white bg-white">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0"
            style={{ backgroundImage: "url('/images/home5.png')" }}
          />
          <div 
            ref={addToRevealRefs}
            className={`relative z-10 max-w-screen-xl mx-auto px-4 transition-all duration-700 ${
              visibleElements.has(revealRefs.current.indexOf(revealRefs.current[0])) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 relative">
              <span className="block">
                <span className="text-[#E59C24]">University Assessment</span>
              </span>
              <span className="block">
                <span className="text-red-600">and Guidance Center</span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-black mb-8 max-w-4xl mx-auto leading-relaxed">
              Welcome to a safe space where you can access guidance and counselling,
              psychological testing, and referral services to support your well-being
              and success.
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center">
              <button 
                onClick={() => scrollToSection('guide')}
                className="cursor-pointer w-full md:w-auto max-w-xs bg-red-600 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-red-700 transition-all duration-500"
              >
                Guidance & Counselling
              </button>
              <button 
                onClick={() => scrollToSection('test')}
                className="cursor-pointer w-full md:w-auto max-w-xs bg-[#E59C24] text-white px-6 py-3.5 rounded-full font-semibold hover:bg-orange-800 transition-all duration-500"
              >
                Psychological Test
              </button>
              <button 
                onClick={() => scrollToSection('refer')}
                className="cursor-pointer w-full md:w-auto max-w-xs bg-white text-red-600 border border-gray-300 px-6 py-3.5 rounded-full font-semibold hover:bg-red-600 hover:text-white transition-all duration-500"
              >
                Referrals
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-14 relative z-10">
          <div className="max-w-screen-xl mx-auto px-4">
            <h2 
              ref={addToRevealRefs}
              className={`text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 transition-all duration-700 ${
                visibleElements.has(revealRefs.current.indexOf(revealRefs.current[1])) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              UAGC Services
            </h2>

            {/* Guidance & Counselling Card */}
            <section id="guide" className="mb-8">
              <div 
                ref={addToRevealRefs}
                className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-700 ${
                  visibleElements.has(revealRefs.current.indexOf(revealRefs.current[2])) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8 items-center text-center md:text-left">
                  <div className="w-full md:w-1/2 md:pr-8">
                    <div className="relative w-full min-h-48 flex items-center justify-center">
                      <img src="/images/1.png" alt="Guidance & Counselling Illustration" className="max-w-full h-auto" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
                      Guidance & Counselling
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-6">
                      Please take a moment to fill out the Guidance & Counselling Form so we
                      can better understand your concerns and provide the support you need.
                    </p>
                    <button className="cursor-pointer w-full md:w-auto max-w-sm bg-red-600 text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity duration-300">
                      Guidance & Counselling Form
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Psychological Test Card */}
            <section id="test" className="mb-8">
              <div 
                ref={addToRevealRefs}
                className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-700 ${
                  visibleElements.has(revealRefs.current.indexOf(revealRefs.current[3])) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8 items-center text-center md:text-left">
                  <div className="w-full md:w-1/2 md:pr-8">
                    <div className="relative w-full min-h-48 flex items-center justify-center">
                      <img src="/images/2.png" alt="Psychological Test Illustration" className="max-w-full h-auto" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#E59C24] mb-4">
                      Psychological Test
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-6">
                      Please take a moment to fill out the Psychological Test Form so we
                      can better understand your concerns and provide the support you need.
                    </p>
                    <button className="cursor-pointer w-full md:w-auto max-w-sm bg-[#E59C24] text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity duration-300">
                      Psychological Test Form
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Referrals Card */}
            <section id="refer" className="mb-8">
              <div 
                ref={addToRevealRefs}
                className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-700 ${
                  visibleElements.has(revealRefs.current.indexOf(revealRefs.current[4])) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8 items-center text-center md:text-left">
                  <div className="w-full md:w-1/2 md:pr-8">
                    <div className="relative w-full min-h-48 flex items-center justify-center">
                      <img src="/images/3.png" alt="Referrals Illustration" className="max-w-full h-auto" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-4">
                      Referrals
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-6">
                      If you need additional support, we're here to help—please complete the
                      referral form so we can connect you to the right services.
                    </p>
                    <button className="cursor-pointer w-full md:w-auto max-w-sm bg-red-700 text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity duration-300">
                      Referral Form
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-16 relative z-10">
          <div className="max-w-5xl mx-auto px-4">
            <div 
              ref={addToRevealRefs}
              className={`bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-8 md:p-10 text-center text-white transition-all duration-700 ${
                visibleElements.has(revealRefs.current.indexOf(revealRefs.current[5])) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                University Assessment <br className="md:hidden" />
                and Guidance Center
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Welcome to a safe space to access guidance and counselling, psychological
                testing, and referral services to support your well-being and success.
              </p>
              <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
                <button 
                  onClick={() => scrollToSection('guide')}
                  className="cursor-pointer w-full md:w-auto max-w-sm bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-800 transition-colors duration-300"
                >
                  Guidance & Counselling
                </button>
                <button 
                  onClick={() => scrollToSection('test')}
                  className="cursor-pointer w-full md:w-auto max-w-sm bg-[#E59C24] text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-800 transition-colors duration-300"
                >
                  Psychological Test
                </button>
                <button 
                  onClick={() => scrollToSection('refer')}
                  className="cursor-pointer w-full md:w-auto max-w-sm bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Referrals
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 py-8 relative z-10">
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <div className="text-base font-medium text-gray-800 mb-4">
              UAGC System Appointment Platform
            </div>
            <nav className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 mb-5">
              {[
                { id: 'home', label: 'Home' },
                { id: 'guide', label: 'Guidance & Counselling' },
                { id: 'test', label: 'Psychological Test' },
                { id: 'refer', label: 'Referrals' }
              ].map(({ id, label }: NavigationItem) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="cursor-pointer text-gray-500 hover:text-gray-900 transition-colors duration-300"
                >
                  {label}
                </button>
              ))}
            </nav>
            <p className="text-gray-500 text-sm">
              © 2025 UAGC System. SDMD. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`cursor-pointer fixed bottom-6 right-6 bg-[#E59C24] text-white p-3 rounded-full shadow-xl hover:bg-orange-600 transition-all duration-500 z-50 ${
            showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    );
  };

  export default UAGCLandingPage;