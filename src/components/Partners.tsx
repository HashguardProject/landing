import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from './common/SectionTitle';
import './styles/Partners.css';

interface Partner {
  name: string;
  alt: string;
}

const Partners: React.FC = () => {
  const { t } = useTranslation('partners');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Check if the user prefers dark mode
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Define available partner images from the public directory
  const availablePartners = {
    "iExec": `/partners/iexec-${!isDarkMode ? 'white' : 'black'}.png`,
    "Flashback": `/partners/flashback-${!isDarkMode ? 'white' : 'black'}.png`,
    "Cube3": `/partners/cube3-${!isDarkMode ? 'white' : 'black'}.png`,
    "Coinaute": `/partners/coinaute-white.png`, // Only white version available
    "Alyra": `/partners/Alyra_Origin.gif`
  };

  const partners = t('partners', { returnObjects: true }) as Partner[];
  
  // Create duplicated list for infinite scroll effect
  const duplicatedPartners = [...partners, ...partners, ...partners];

  // Preload images to prevent flickering during animation
  useEffect(() => {
    const imageUrls = partners
      .map(partner => availablePartners[partner.name as keyof typeof availablePartners])
      .filter(Boolean);
    
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = url as string;
    });
  }, [partners, isDarkMode]);

  return (
    <section className="partners-section" id="partners">
      <div className="container">
        <SectionTitle 
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        
        <div className="partners-carousel-container">
          <div className={`partners-carousel ${imagesLoaded ? 'animate' : ''}`}>
            {duplicatedPartners.map((partner, index) => {
              const imageUrl = availablePartners[partner.name as keyof typeof availablePartners];
              if (!imageUrl) return null;
              
              return (
                <div 
                  key={`${partner.name}-${index}`}
                  className="partner-logo"
                >
                  <img 
                    src={imageUrl} 
                    alt={partner.alt}
                    className="partner-image"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;