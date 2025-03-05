import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <i className="fas fa-shield-alt"></i>
              Hashguard
            </div>
            <p className="footer-description">
              Hashguard est la solution de stockage cloud décentralisée qui garantit la confidentialité et la sécurité de vos données grâce à une technologie de chiffrement de pointe.
            </p>
            <div className="social-links">
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-discord"></i></a>
              <a href="#"><i className="fab fa-github"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Produit</h4>
            <ul>
              <li><a href="#">Fonctionnalités</a></li>
              <li><a href="#">Tarifs</a></li>
              <li><a href="#">Feuille de route</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Téléchargements</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Ressources</h4>
            <ul>
              <li><a href="#">Centre d'aide</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Communauté</a></li>
              <li><a href="#">Tutoriels</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Entreprise</h4>
            <ul>
              <li><a href="#">À propos</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Carrières</a></li>
              <li><a href="#">Partenaires</a></li>
              <li><a href="#">Presse</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Hashguard - Tous droits réservés</p>
          <div className="footer-links-secondary">
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Conditions d'utilisation</a>
            <a href="#">Cookies</a>
          </div>
          <div className="language-selector">
            <i className="fas fa-globe"></i>
            Français
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;