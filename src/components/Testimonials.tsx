import React, { useState } from 'react';
import SectionTitle from './common/SectionTitle';

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      content: "Hashguard a transformé ma façon de gérer les données sensibles de mes clients. L'interface est intuitive et la sécurité est sans compromis. Je peux enfin stocker des documents confidentiels sans craindre qu'ils ne soient accessibles à des tiers non autorisés.",
      author: "Sarah Chen",
      role: "Consultante en protection des données",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      content: "En tant que cabinet d'avocats, nous traitons des documents ultra-confidentiels quotidiennement. Avec Hashguard, nous avons trouvé la solution parfaite qui nous permet de respecter nos obligations légales tout en simplifiant notre flux de travail.",
      author: "Thomas Legrand",
      role: "Avocat associé",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      content: "J'étais sceptique au début concernant la simplicité d'utilisation d'une solution décentralisée, mais Hashguard a fait un travail remarquable pour rendre la technologie accessible. Je l'utilise maintenant pour tous mes projets créatifs.",
      author: "Maria Rodriguez",
      role: "Designer indépendante",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=461&q=80"
    }
  ];

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
          eyebrow="Témoignages"
          title="Ce que disent nos utilisateurs"
          description="Découvrez l'expérience des utilisateurs qui ont choisi Hashguard pour sécuriser leurs données."
        />
        
        <div className="testimonial-slider fade-in-up delay-200">
          <div className="testimonial-track">
            <div className="testimonial-card">
              <div className="testimonial-content">
                {testimonials[currentSlide].content}
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src={testimonials[currentSlide].avatar} alt={testimonials[currentSlide].author} />
                </div>
                <div className="author-info">
                  <h4>{testimonials[currentSlide].author}</h4>
                  <span>{testimonials[currentSlide].role}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-nav">
            <button className="testimonial-btn" onClick={prevSlide}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <button className="testimonial-btn" onClick={nextSlide}>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <div 
                key={index}
                className={`testimonial-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;