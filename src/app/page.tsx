'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && isConnected) {
      router.push('/dashboard');
    }
  }, [isClient, isConnected, router]);

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SkillSync
            </span>
          </h1>
          <p className="mx-auto max-w-md text-lg text-gray-600 dark:text-gray-300 sm:max-w-xl sm:text-xl">
            Mint and showcase verifiable skill badges on the blockchain. 
            Connect your wallet to get started.
          </p>
          
          <div className="mt-8">
            <ConnectButton 
              chainStatus="none"
              showBalance={false}
            />
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="text-3xl font-bold text-blue-600">1</div>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Connect Wallet</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Securely connect your Web3 wallet to begin your journey.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="text-3xl font-bold text-blue-600">2</div>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Mint Badges</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Earn verifiable skill badges by completing challenges.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="text-3xl font-bold text-blue-600">3</div>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Showcase Skills</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Display your achievements and build your reputation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}