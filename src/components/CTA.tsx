import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="cta">
      <div className="cta-blob"></div>
      <div className="cta-blob-2"></div>
      <div className="container">
        <h2 className="fade-in-up">Faites le premier pas vers un cloud véritablement privé</h2>
        <p className="fade-in-up delay-100">Reprenez le contrôle de vos données dès aujourd'hui avec 2 Go gratuits et découvrez la différence Hashguard.</p>
        <a href="#" className="btn btn-light fade-in-up delay-200">Essayer Hashguard gratuitement <i className="fas fa-arrow-right"></i></a>
        
        <div className="newsletter fade-in-up delay-300">
          <h3>Restez informé des dernières actualités</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Votre email" />
            <button type="submit" className="btn btn-light">S'abonner</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;