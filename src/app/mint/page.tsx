'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { mintBadge } from '@/utils/kwala';

export default function MintBadge() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Redirect to home if not connected, but only on client side
    if (isClient && !isConnected) {
      router.push('/');
    }
  }, [isClient, isConnected, router]);

  const handleMint = async () => {
    if (!address) return;
    
    setLoading(true);
    try {
      // In a real implementation, this would call the actual minting API
      // For demo purposes, we'll simulate a successful response
      await mintBadge(address);
      
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      
      toast({
        title: "Success!",
        description: `Your ${selectedLevel} level badge has been minted successfully.`,
        action: (
          <ToastAction 
            altText="View" 
            onClick={() => router.push('/dashboard')}
          >
            View
          </ToastAction>
        ),
      });
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error minting badge:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mint badge. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  // Don't render anything if not connected
  if (!isConnected) {
    return null;
  }

  // Badge level options
  const badgeLevels = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'For those starting their Web3 journey',
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      icon: '🌱'
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'For developers with some Web3 experience',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      icon: '⭐'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'For experienced Web3 developers',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      icon: '🔥'
    },
    {
      id: 'expert',
      name: 'Expert',
      description: 'For Web3 masters and blockchain architects',
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
      icon: '🏆'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg bg-white p-8 shadow dark:bg-gray-800">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mint New Badge</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Earn a verifiable skill badge by completing this challenge.
              </p>
              
              <div className="mt-8 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Web3 Developer Badge</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  This badge verifies your skills in Web3 development, including smart contracts, 
                  decentralized applications, and blockchain fundamentals.
                </p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select Badge Level</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Choose the level that best matches your skills
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {badgeLevels.map((level) => (
                      <div
                        key={level.id}
                        className={`rounded-lg border p-4 cursor-pointer transition-all ${
                          selectedLevel === level.id
                            ? 'border-blue-500 ring-2 ring-blue-500/20'
                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedLevel(level.id)}
                      >
                        <div className="flex items-start">
                          <span className="text-2xl">{level.icon}</span>
                          <div className="ml-3">
                            <h4 className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${level.color}`}>
                              {level.name}
                            </h4>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              {level.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Requirements</h3>
                    <ul className="mt-2 list-inside list-disc text-gray-600 dark:text-gray-300">
                      <li>Complete a smart contract challenge</li>
                      <li>Deploy a dApp to a testnet</li>
                      <li>Verify your identity with a wallet signature</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={handleMint}
                  disabled={loading}
                  className="w-full py-6 text-lg"
                >
                  {loading ? (
                    <>
                      <svg className="mr-2 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Earn ${badgeLevels.find(l => l.id === selectedLevel)?.name} Badge`
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}