import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation('hero');
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    files: 0,
    storage: 0
  });

  // Simulated stats - Replace with real API calls
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: Math.min(prev.users + 1, 1000),
        files: Math.min(prev.files + 5, 10000),
        storage: Math.min(prev.storage + 2, 500)
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    const text = t('title.part2');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [t]);

  return (
    <section className="hero">
      <div className="hero-blob"></div>
      <div className="hero-blob-2"></div>
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-eyebrow"
          >
            {t('eyebrow')}
          </motion.div>
          <h1>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('title.part1')}
            </motion.span>
            <motion.span 
              className="gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {typedText}
            </motion.span>
          </h1>
          <p>{t('description')}</p>
          
          <div className="hero-buttons fade-in-up delay-200">
            <motion.a 
              href="#" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('buttons.try')} <i className="fas fa-arrow-right"></i>
            </motion.a>
            <motion.a 
              href="#how-it-works" 
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('buttons.howItWorks')}
            </motion.a>
          </div>

          <div className="hero-badges fade-in-up delay-300">
            <motion.div 
              className="badge"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <i className="fas fa-lock"></i>
              {t('badges.private')}
            </motion.div>
            <motion.div 
              className="badge"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <i className="fas fa-shield-alt"></i>
              {t('badges.encryption')}
            </motion.div>
            <motion.div 
              className="badge"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <i className="fas fa-cloud"></i>
              {t('badges.storage')}
            </motion.div>
            <motion.div 
              className="badge"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <i className="fas fa-thumbs-up"></i>
              {t('badges.simple')}
            </motion.div>
          </div>
{/* 
          <div className="hero-stats fade-in-up delay-400">
            <motion.div 
              className="stat-card"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <i className="fas fa-users"></i>
              <div className="stat-value">{stats.users.toLocaleString()}+</div>
              <div className="stat-label">{t('stats.users')}</div>
            </motion.div>
            <motion.div 
              className="stat-card"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <i className="fas fa-file-shield"></i>
              <div className="stat-value">{stats.files.toLocaleString()}+</div>
              <div className="stat-label">{t('stats.files')}</div>
            </motion.div>
            <motion.div 
              className="stat-card"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <i className="fas fa-database"></i>
              <div className="stat-value">{stats.storage.toLocaleString()}+</div>
              <div className="stat-label">{t('stats.storage')}</div>
            </motion.div>
          </div> */}
        </motion.div>

        <motion.div 
          className="hero-3d-scene"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt={t('image.alt')}
          />
        </motion.div>

        {/* Floating Chat Bubble */}
        <motion.div 
          className="chat-bubble"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 2 }}
          onClick={() => setShowChat(!showChat)}
        >
          <i className="fas fa-comment-dots"></i>
          {showChat && (
            <div className="chat-popup">
              <div className="chat-header">
                <h4>{t('chat.needHelp')}</h4>
                <button onClick={(e) => { e.stopPropagation(); setShowChat(false); }}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="chat-body">
                <p>{t('chat.teamHelp')}</p>
                <button className="btn btn-primary btn-sm">{t('chat.startChat')}</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;