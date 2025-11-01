'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BadgeCard } from '@/components/BadgeCard';
import { BadgeModal } from '@/components/BadgeModal';
import { Navbar } from '@/components/Navbar';
import { getBadges } from '@/utils/kwala';
import { BadgeInfo } from '@/types';
import { RefreshCw, PlusCircle, Trophy, User, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [badges, setBadges] = useState<BadgeInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<BadgeInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Redirect to home if not connected, but only on client side
    if (isClient && !isConnected) {
      router.push('/');
    } else if (isClient && isConnected) {
      fetchBadges();
    }
  }, [isClient, isConnected, router]);

  const fetchBadges = async () => {
    if (!address) return;
    
    try {
      setLoading(true);
      setError(null);
      const userBadges = await getBadges(address);
      setBadges(userBadges);
    } catch (err: unknown) {
      console.error('Error fetching badges:', err);
      let errorMessage = 'Failed to load badges. Please try again.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      // Set badges to empty array to avoid breaking the UI
      setBadges([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBadgeClick = (badge: BadgeInfo) => {
    setSelectedBadge(badge);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBadge(null);
  };

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  // Don't render anything if not connected
  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Connected wallet: <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:mt-0">
              <Button 
                onClick={fetchBadges}
                variant="outline"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                onClick={() => router.push('/mint')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Mint Badge
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <motion.div 
            className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Badges</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{badges.length}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <User className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profile Status</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">Complete</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rank</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">#12</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Badges Section */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Badges</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400 sm:mt-0">
              {badges.length} {badges.length === 1 ? 'badge' : 'badges'} earned
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/20">
              <p className="text-red-800 dark:text-red-200">{error}</p>
              <Button
                onClick={fetchBadges}
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          ) : badges.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-12 text-center dark:bg-gray-700">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No badges yet</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Get started by minting your first skill badge.
              </p>
              <Button
                onClick={() => router.push('/mint')}
                className="mt-6 bg-blue-600 hover:bg-blue-700"
              >
                Mint Your First Badge
              </Button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <BadgeCard badge={badge} onClick={() => handleBadgeClick(badge)} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      
      <BadgeModal 
        badge={selectedBadge} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
}