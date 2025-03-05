import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from './common/SectionTitle';

interface RoadmapItem {
  year: string;
  title: string;
  items: string[];
}

interface RoadmapTranslations {
  eyebrow: string;
  title: string;
  description: string;
  joinButton: string;
  timeline: RoadmapItem[];
}

const Roadmap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useTranslation('roadmap');

  const roadmapItems = t('timeline', { returnObjects: true }) as RoadmapItem[];

  return (
    <section id="roadmap" className="py-20 md:py-32 relative bg-gradient-to-b from-gray-100 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <SectionTitle 
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className="relative max-w-4xl mx-auto mt-16">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400 md:transform md:-translate-x-1/2 rounded-full" />

          {roadmapItems.map((item: RoadmapItem, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className={`relative mb-12 pl-10 md:pl-0 ${
                index % 2 === 0 ? "md:pr-12 md:ml-auto md:mr-[50%]" : "md:pl-12 md:mr-auto md:ml-[50%]"
              } md:w-[calc(50%-24px)]`}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 transition-all duration-300 hover:border-blue-400/30 hover:shadow-xl hover:-translate-y-2 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white border border-blue-600/20 font-semibold text-sm mb-3">
                  {item.year}
                </span>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((listItem: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">{listItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline dot */}
              <div
                className={`absolute top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full z-20 ${
                  index % 2 === 0
                    ? "md:right-0 md:translate-x-1/2 left-0 md:left-auto"
                    : "md:left-0 md:-translate-x-1/2 left-0"
                }`}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-base py-6 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            {t('joinButton')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Roadmap;