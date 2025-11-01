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
import { 
  Trophy, 
  Zap, 
  ShieldCheck, 
  Code, 
  Database, 
  Globe, 
  ArrowRight, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function MintBadge() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('intermediate');
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
      // Call the actual minting API with the selected level
      await mintBadge(address, selectedLevel);
      
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
    } catch (err: unknown) {
      console.error('Error minting badge:', err);
      let errorMessage = "Failed to mint badge. Please try again.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
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
      icon: '🌱',
      features: [
        "Basic blockchain concepts",
        "Wallet setup and management",
        "Introduction to smart contracts",
        "Understanding gas fees"
      ]
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'For developers with some Web3 experience',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      icon: '⭐',
      features: [
        "Solidity programming",
        "Smart contract deployment",
        "Web3.js integration",
        "Token standards (ERC-20, ERC-721)"
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'For experienced Web3 developers',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      icon: '🔥',
      features: [
        "DeFi protocol development",
        "Layer 2 solutions",
        "Security best practices",
        "Cross-chain interoperability"
      ]
    },
    {
      id: 'expert',
      name: 'Expert',
      description: 'For Web3 masters and blockchain architects',
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
      icon: '🏆',
      features: [
        "Protocol design and architecture",
        "Consensus mechanism expertise",
        "Zero-knowledge proofs",
        "Enterprise blockchain solutions"
      ]
    }
  ];

  const selectedBadge = badgeLevels.find(level => level.id === selectedLevel);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Mint Your Skill Badge
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Earn a verifiable credential that showcases your Web3 expertise to the world
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Badge Selection */}
              <div className="lg:col-span-2">
                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Select Your Skill Level
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {badgeLevels.map((level) => (
                      <div
                        key={level.id}
                        className={`rounded-lg border p-5 cursor-pointer transition-all ${
                          selectedLevel === level.id
                            ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedLevel(level.id)}
                      >
                        <div className="flex items-start">
                          <span className="text-3xl">{level.icon}</span>
                          <div className="ml-4">
                            <h3 className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${level.color}`}>
                              {level.name}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              {level.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Badge Details */}
                {selectedBadge && (
                  <motion.div 
                    className="mt-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      What You{`'`}ll Learn at the {selectedBadge.name} Level
                    </h3>
                    <ul className="space-y-2">
                      {selectedBadge.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Requirements */}
                <div className="mt-6 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Requirements
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white">Wallet Verification</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Your wallet address will be permanently linked to this badge
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          <Zap className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white">Gas Fees</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Small network fees required for minting (approximately 0.01 ETH)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          <Trophy className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white">Verification</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Complete skill assessment to verify your expertise
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Preview Card */}
                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Badge Preview
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <Trophy className="h-16 w-16 text-white" />
                      <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white text-center text-lg dark:bg-gray-900">
                        {selectedBadge?.icon}
                      </div>
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                      Web3 Developer
                    </h4>
                    <span className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${selectedBadge?.color}`}>
                      {selectedBadge?.name}
                    </span>
                  </div>
                </div>

                {/* Mint Button */}
                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                  <Button 
                    onClick={handleMint}
                    disabled={loading}
                    className="w-full py-3 text-lg"
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
                      <>
                        Mint {selectedBadge?.name} Badge
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      By minting this badge, you agree to our terms of service
                    </p>
                  </div>
                </div>

                {/* Info Box */}
                <div className="rounded-lg bg-blue-50 p-5 dark:bg-blue-900/20">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Important
                      </h3>
                      <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                        <p>
                          Once minted, badges are permanently stored on the blockchain and cannot be deleted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}