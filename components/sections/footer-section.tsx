import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBriefcase, FaRocket } from 'react-icons/fa';

const CosmicPortal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const planets = [
    { icon: <FaCode />, title: 'Services', link: '/services' },
    { icon: <FaBriefcase />, title: 'Portfolio', link: '/portfolio' },
    { icon: <FaRocket />, title: 'Surprise!', link: '/surprise' },
  ];

  return (
    <div className="fixed bottom-10 left-10 z-50">
      <motion.div
        className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-600 dark:to-purple-600 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(147,51,234,0.5)] dark:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white text-2xl">🌌</span>
      </motion.div>
      {isOpen && (
        <div className="absolute top-0 left-0 w-64 h-64 flex items-center justify-center">
          {planets.map((planet, index) => (
            <motion.a
              key={index}
              href={planet.link}
              className="absolute w-14 h-14 bg-white/10 dark:bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white shadow-lg dark:shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: Math.cos((index * 2 * Math.PI) / planets.length) * 100,
                y: Math.sin((index * 2 * Math.PI) / planets.length) * 100,
              }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.2, boxShadow: '0 0 20px rgba(59,130,246,0.9)' }}
            >
              {planet.icon}
              <span className="absolute hidden group-hover:block text-sm bg-black/80 px-2 py-1 rounded top-[-30px]">
                {planet.title}
              </span>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CosmicPortal;