import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from './common/SectionTitle';
import AppButton from './common/AppButton';
import styles from '../styles/components/Roadmap.module.css';

interface RoadmapItem {
  year: string;
  title: string;
  items: string[];
}

const Roadmap: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('roadmap');
  const containerRef = useRef<HTMLDivElement>(null);
  const joinBtnRef = useRef<HTMLDivElement>(null);
  const isJoinBtnInView = useInView(joinBtnRef, { once: false, amount: 0.8 });
  
  // Get the roadmap items from translations
  const roadmapItems = t('timeline', { returnObjects: true }) as RoadmapItem[];

  // Create a scroll-linked animation with improved offset range for earlier visibility
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.1"] // Modified to trigger earlier at the bottom
  });

  // Calculate the segment size for the line progression
  const totalItems = roadmapItems.length;
  
  // We'll evenly distribute the milestones throughout 70% of the scroll range, leaving more space at the end
  const scrollRange = 0.7; // Reduced from 0.75 to make everything appear earlier
  const startOffset = 0.05;
  
  // Calculate the progress point for each milestone with special handling for the last milestone
  const segments = roadmapItems.map((_, index) => {
    // For the last item, we reduce its offset to make it appear earlier
    if (index === totalItems - 1) {
      // The last milestone appears earlier in the scroll progress
      return startOffset + ((index - 0.2) * (scrollRange / totalItems));
    }
    const progress = startOffset + (index * (scrollRange / totalItems));
    return progress;
  });
  
  // Add the final position for the CTA button (appearing more rapidly)
  segments.push(segments[segments.length - 1] + 0.05); // Add just a small increment for the final segment

  return (
    <section id="roadmap" className={styles.roadmap} ref={sectionRef}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className={styles.timeline}>
          {/* Main timeline line - a single continuous line */}
          <motion.div 
            className={styles.timelineLine}
            style={{ 
              scaleY: useTransform(
                scrollYProgress, 
                [0, segments[segments.length - 1]],
                [0, 1]
              ),
              originY: 0
            }}
          />

          {/* Milestone cards */}
          {roadmapItems.map((item, index) => {
            // Set improved ranges for smoother control
            const isLastItem = index === roadmapItems.length - 1;
            const milestoneOffset = isLastItem ? 0.05 : 0.03; // Wider range for last item
            
            // Calculate start and end progress for this milestone
            const startProgress = segments[index];
            const endProgress = Math.min(startProgress + milestoneOffset, 1);
            
            // Progress for dot appearance - smoothed transition
            const dotAppearProgress = useTransform(
              scrollYProgress,
              [startProgress - 0.02, startProgress], // Slightly earlier to appear more gradually
              [0, 1]
            );
            
            // Progress for card appearance - starts after dot appears, with smoother timing
            const cardAppearProgress = useTransform(
              scrollYProgress,
              [startProgress - 0.01, endProgress], // Slight overlap with dot
              [0, 1]
            );

            return (
              <div
                key={index}
                className={`${styles.milestoneWrapper} ${index % 2 === 0 ? styles.left : styles.right}`}
              >
                {/* Animate card opacity and transform based on scroll progress */}
                <motion.div 
                  className={styles.milestoneCard}
                  style={{
                    opacity: cardAppearProgress,
                    y: useTransform(cardAppearProgress, [0, 1], [30, 0]),
                    x: useTransform(
                      cardAppearProgress, 
                      [0, 1], 
                      // Different slide-in direction based on card position
                      index % 2 === 0 ? [40, 0] : [-40, 0]
                    )
                  }}
                >
                  <span className={styles.yearBadge}>
                    {item.year}
                  </span>
                  <h3 className={styles.milestoneTitle}>{item.title}</h3>
                  <ul className={styles.milestoneList}>
                    {item.items.map((listItem, i) => (
                      <li key={i} className={styles.milestoneItem}>
                        <span className={styles.milestoneItemText}>{listItem}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Timeline dot - with smoother transition */}
                <motion.div
                  className={`${styles.timelineDot} ${index % 2 === 0 ? styles.left : styles.right}`}
                  style={{
                    opacity: dotAppearProgress,
                    scale: useTransform(
                      dotAppearProgress,
                      [0, 1],
                      [0.6, 1]  // Start from a slightly larger size for smoother appearance
                    )
                  }}
                  transition={{
                    opacity: { duration: 0.4, ease: "easeOut" },
                    scale: { duration: 0.5, ease: "easeOut" }
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Join button */}
        <motion.div
          ref={joinBtnRef}
          className={styles.joinSection}
          style={{
            opacity: useTransform(
              scrollYProgress, 
              [segments[segments.length - 1] - 0.02, segments[segments.length - 1] + 0.03], // Appear earlier
              [0, 1]
            ),
            y: useTransform(
              scrollYProgress,
              [segments[segments.length - 1] - 0.02, segments[segments.length - 1] + 0.03],
              [20, 0]
            )
          }}
        >
          <motion.div 
            initial={{ scale: 0.7, opacity: 0 }}
            animate={isJoinBtnInView ? { 
              scale: [0.7, 1.1, 1],
              opacity: 1
            } : { scale: 0.7, opacity: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.175, 0.885, 0.32, 1.275],
              delay: 0.1,
              scale: {
                times: [0, 0.6, 1]
              }
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
          >
            <AppButton
              action="signup"
              className={styles.joinButton}
            >
              {t('joinButton')}
            </AppButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Roadmap;