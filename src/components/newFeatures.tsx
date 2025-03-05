import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "./common/SectionTitle";
import styles from "../styles/components/Features.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
  demoVideo: string;
  implementationProgress: number;
  testimonial: {
    text: string;
    author: string;
    avatar: string;
  };
  tooltip: string;
}

const Features: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const features: Feature[] = [
    {
      icon: "fa-lock",
      title: "Chiffrement avancé",
      description:
        "Double système de chiffrement avec clés personnelles et couche de protection iExec. Vos données restent totalement privées, même pour nous.",
      demoVideo: "/videos/encryption-demo.mp4",
      implementationProgress: 100,
      testimonial: {
        text: "Le chiffrement est vraiment impressionnant, je peux enfin stocker mes données sensibles en toute confiance.",
        author: "Marie Dubois",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
      tooltip:
        "Découvrez comment notre système de double chiffrement protège vos données",
    },
    {
      icon: "fa-share-alt",
      title: "Partage sécurisé",
      description:
        "Partagez vos fichiers en toute sécurité avec des contrôles granulaires sur les permissions et des liens à durée limitée, sans jamais compromettre vos données.",
      demoVideo: "/videos/sharing-demo.mp4",
      implementationProgress: 90,
      testimonial: {
        text: "Le partage de fichiers n'a jamais été aussi simple et sécurisé.",
        author: "Thomas Martin",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
      tooltip: "Explorez nos options de partage sécurisé avec contrôle total",
    },
    {
      icon: "fa-wallet",
      title: "Multi-wallets & CB",
      description:
        "Connectez-vous facilement avec Metamask, Wallet Cometh ou simplement par carte bancaire. Aucune expertise crypto requise pour profiter de la technologie.",
      demoVideo: "/videos/wallet-demo.mp4",
      implementationProgress: 85,
      testimonial: {
        text: "L'intégration des wallets est parfaite, même pour les non-initiés à la crypto.",
        author: "Sophie Bernard",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      },
      tooltip: "Découvrez la simplicité de nos options de paiement",
    },
    {
      icon: "fa-store",
      title: "Marché du stockage",
      description:
        "Comparez et choisissez vos fournisseurs de stockage selon vos besoins spécifiques de sécurité, performance et coût, pour une expérience totalement personnalisée.",
      demoVideo: "/videos/marketplace-demo.mp4",
      implementationProgress: 75,
      testimonial: {
        text: "Le marché du stockage m'a permis de trouver exactement ce dont j'avais besoin.",
        author: "Pierre Durand",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
      tooltip: "Explorez notre marketplace de solutions de stockage",
    },
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement feedback submission
    console.log("Feedback submitted:", feedbackText);
    setFeedbackText("");
    setShowFeedbackForm(false);
  };

  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <SectionTitle
          eyebrow="Fonctionnalités clés"
          title="Sécurité avancée, simplicité d'utilisation"
          description="Une expérience utilisateur sans compromis sur la protection de vos données."
        />

        <motion.div
          className={styles.featureGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={styles.featureIcon}>
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>

              <div
                className={styles.demoPreview}
                onClick={() => setActiveDemo(feature.title)}
              >
                <video
                  src={feature.demoVideo}
                  muted
                  loop
                  playsInline
                  poster={`/images/${feature.icon}-preview.jpg`}
                />
              </div>

              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${feature.implementationProgress}%` }}
                />
              </div>

              <div className={styles.testimonialBadge}>
                <img
                  src={feature.testimonial.avatar}
                  alt={feature.testimonial.author}
                />
                <span>{feature.testimonial.text}</span>
              </div>

              <button
                className={styles.feedbackButton}
                onClick={() => setShowFeedbackForm(true)}
              >
                <i className="fas fa-comment"></i>
                Donner mon avis
              </button>

              <a href="#" className={styles.tryFeatureButton}>
                Essayer maintenant
                <i className="fas fa-arrow-right"></i>
              </a>

              <div className={styles.tooltip}>{feature.tooltip}</div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {showFeedbackForm && (
            <motion.div
              className={styles.feedbackModal}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className={styles.feedbackContent}>
                <h3>Votre avis compte</h3>
                <form onSubmit={handleFeedbackSubmit}>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Partagez votre expérience ou suggérez des améliorations..."
                  />
                  <div className={styles.feedbackActions}>
                    <button
                      type="button"
                      onClick={() => setShowFeedbackForm(false)}
                    >
                      Annuler
                    </button>
                    <button type="submit">Envoyer</button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeDemo && (
            <motion.div
              className={styles.demoModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDemo(null)}
            >
              <motion.div
                className={styles.demoContent}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.closeButton}
                  onClick={() => setActiveDemo(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
                <video
                  src={features.find((f) => f.title === activeDemo)?.demoVideo}
                  autoPlay
                  controls
                  loop
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Features;
