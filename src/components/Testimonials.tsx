import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from './common/SectionTitle';

interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar?: string;
}

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation('testimonials');
  
  const testimonials = t('testimonials', { returnObjects: true }) as unknown as Testimonial[];

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <SectionTitle 
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        
        <div className="testimonial-slider fade-in-up delay-200">
          <div className="testimonial-track">
            <div className="testimonial-card">
              <div className="testimonial-content">
                {testimonials[currentSlide].content}
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonials[currentSlide].avatar && (
                    <img 
                      src={testimonials[currentSlide].avatar} 
                      alt={testimonials[currentSlide].author} 
                    />
                  )}
                </div>
                <div className="author-info">
                  <h4>{testimonials[currentSlide].author}</h4>
                  <span>{testimonials[currentSlide].role}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-nav">
            <button 
              className="testimonial-btn" 
              onClick={prevSlide}
              aria-label={t('navigation.previous')}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <button 
              className="testimonial-btn" 
              onClick={nextSlide}
              aria-label={t('navigation.next')}
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_: Testimonial, index: number) => (
              <div 
                key={index}
                className={`testimonial-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                role="button"
                aria-label={`Go to testimonial ${index + 1}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;