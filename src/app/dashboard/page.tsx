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
    } catch (err) {
      console.error('Error fetching badges:', err);
      setError('Failed to load badges. Please try again.');
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Connected wallet: <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button
              onClick={fetchBadges}
              className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ) : badges.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No badges yet</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Get started by minting your first skill badge.
            </p>
            <button
              onClick={() => router.push('/mint')}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Mint Your First Badge
            </button>
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
      </main>
      
      <BadgeModal 
        badge={selectedBadge} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
}