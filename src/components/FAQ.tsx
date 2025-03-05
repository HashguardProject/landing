import React, { useState } from 'react';
import SectionTitle from './common/SectionTitle';

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const faqItems = [
    {
      question: "Comment Hashguard protège-t-il mes données ?",
      answer: "Hashguard utilise un double système de chiffrement : vos fichiers sont d'abord chiffrés sur votre appareil avec des clés dont vous seul avez le contrôle, puis une seconde couche de protection est ajoutée via iExec Data Protector. Cette approche garantit que même nous ne pouvons pas accéder à vos données. De plus, la décentralisation assure que vos fichiers sont répartis sur plusieurs nœuds, éliminant les points uniques de défaillance."
    },
    {
      question: "Ai-je besoin de connaissances en cryptomonnaies pour utiliser Hashguard ?",
      answer: "Pas du tout ! Hashguard a été conçu pour être accessible à tous, indépendamment de vos connaissances techniques. Vous pouvez vous inscrire et payer avec une carte bancaire traditionnelle. Pour ceux qui préfèrent, nous offrons également la possibilité de se connecter via MetaMask ou Wallet Cometh, mais cette option est entièrement facultative."
    },
    {
      question: "Comment puis-je partager mes fichiers avec d'autres personnes ?",
      answer: "Hashguard vous permet de partager vos fichiers de manière sécurisée via des liens temporaires auxquels vous pouvez appliquer des restrictions comme une date d'expiration, un nombre maximal de téléchargements ou une protection par mot de passe. Vous pouvez également partager des dossiers entiers avec des collègues ou des amis en définissant des permissions spécifiques (lecture seule, édition, etc.)."
    },
    {
      question: "Que se passe-t-il si je perds mes identifiants ou mes clés de chiffrement ?",
      answer: "Hashguard propose plusieurs options de récupération sécurisées. Lors de votre inscription, nous vous guidons dans la création d'une sauvegarde de vos clés que vous pouvez stocker en lieu sûr. Vous pouvez également configurer des méthodes de récupération alternatives comme une phrase secrète ou l'authentification multi-facteurs. Cependant, pour garantir la sécurité maximale, nous ne stockons jamais vos clés de chiffrement - assurez-vous donc de suivre nos recommandations pour la sauvegarde."
    },
    {
      question: "Hashguard est-il conforme au RGPD et autres réglementations ?",
      answer: "Absolument. Hashguard a été conçu dès le départ avec la confidentialité comme principe fondamental. Notre service est entièrement conforme au RGPD et à d'autres réglementations internationales sur la protection des données. Nos serveurs sont situés en Europe, et notre architecture décentralisée garantit que vos données restent sous votre contrôle à tout moment. Pour les entreprises, nous fournissons toute la documentation nécessaire pour faciliter votre propre conformité."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <div className="container">
        <SectionTitle 
          eyebrow="Questions fréquentes"
          title="Tout ce que vous devez savoir"
          description="Trouvez rapidement des réponses à vos questions sur Hashguard."
        />
        
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item fade-in-up ${index > 0 ? `delay-${index * 100}` : ''} ${activeIndex === index ? 'active' : ''}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{item.question}</h3>
                <i className="fas fa-plus"></i>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;