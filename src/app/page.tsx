'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Award, Users, Zap, Globe, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && isConnected) {
      router.push('/dashboard');
    }
  }, [isClient, isConnected, router]);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Confetti effect for CTA button
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  const features = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
      title: "Verifiable Credentials",
      description: "Blockchain-verified skill badges that can't be forged or duplicated"
    },
    {
      icon: <Award className="h-10 w-10 text-blue-600" />,
      title: "Skill Recognition",
      description: "Showcase your expertise with industry-recognized digital badges"
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "Community Driven",
      description: "Join a growing community of Web3 professionals and learners"
    }
  ];

  const stats = [
    { value: "10K+", label: "Badges Minted" },
    { value: "5K+", label: "Active Users" },
    { value: "50+", label: "Skills Verified" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="block">Welcome to</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-text">
                SkillSync
              </span>
            </motion.h1>
            
            <motion.p 
              className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300 sm:text-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Mint and showcase verifiable skill badges on the blockchain. 
              Build your professional reputation with immutable credentials.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="rounded-full shadow-lg hover:shadow-xl transition-all">
                <ConnectButton 
                  chainStatus="none"
                  showBalance={false}
                />
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                className="px-8 py-4 text-lg border-2 rounded-full shadow-lg hover:shadow-xl transition-all group"
                onClick={() => router.push('/gallery')}
              >
                Explore Gallery 
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              Why Choose SkillSync?
            </h2>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform provides unique benefits for professionals in the Web3 space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 ${
                  activeFeature === index ? 'ring-2 ring-blue-500 scale-[1.02]' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setActiveFeature(index)}
              >
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{ 
                    scale: activeFeature === index ? 1.1 : 1,
                    rotate: activeFeature === index ? 5 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
                    {feature.icon}
                  </div>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4"
                  animate={{ 
                    color: activeFeature === index ? '#2563eb' : ''
                  }}
                >
                  {feature.title}
                </motion.h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              How It Works
            </h2>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get started with SkillSync in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Connect Wallet",
                description: "Securely connect your Web3 wallet to begin your journey."
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Mint Badges",
                description: "Earn verifiable skill badges by completing challenges."
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Showcase Skills",
                description: "Display your achievements and build your reputation."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center"></div>
                  </div>
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg">
                    <div className="text-white">
                      {item.icon}
                    </div>
                    <motion.div 
                      className="absolute inset-0 rounded-full border-4 border-blue-400"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    ></motion.div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.title}
                </motion.h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white dark:bg-gray-800 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-8">
              Ready to Showcase Your Skills?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              Join thousands of professionals who have already verified their skills on the blockchain.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerConfetti}
              className="inline-block rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              <ConnectButton 
                chainStatus="none"
                showBalance={false}
              />
            </motion.div>
            
            <motion.p
              className="mt-8 text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              No registration required. Just connect your wallet to get started.
            </motion.p>
          </motion.div>
        </div>
      </div>
      
      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes text {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-text {
          background-size: 200% auto;
          background-image: linear-gradient(to right, #2563eb, #7c3aed, #2563eb);
          animation: text 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}