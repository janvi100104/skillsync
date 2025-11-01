'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { BadgeCard } from '@/components/BadgeCard';
import { BadgeModal } from '@/components/BadgeModal';
import { getBadges } from '@/utils/kwala';
import { BadgeInfo } from '@/types';

export default function Profile() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [badges, setBadges] = useState<BadgeInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState<BadgeInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    website: '',
    twitter: '',
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Redirect to home if not connected, but only on client side
    if (isClient && !isConnected) {
      router.push('/');
    } else if (isClient && isConnected) {
      fetchProfileData();
    }
  }, [isClient, isConnected, router]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      // Simulate fetching user badges
      const userBadges = await getBadges(address || '');
      setBadges(userBadges);
      
      // Simulate fetching user profile
      setProfile({
        name: 'Alex Johnson',
        bio: 'Web3 developer passionate about blockchain technology and decentralized applications. Currently working on NFT marketplaces and DeFi protocols.',
        website: 'https://alexjohnson.dev',
        twitter: '@alexjohnson',
      });
    } catch (err) {
      console.error('Error fetching profile data:', err);
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

  const handleSaveProfile = () => {
    // In a real implementation, this would save the profile data
    alert('Profile saved successfully!');
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
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Header */}
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <div className="flex flex-col items-center sm:flex-row">
                <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 sm:mb-0 sm:mr-6"></div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profile.name || 'Anonymous User'}
                  </h1>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {profile.bio || 'No bio available'}
                  </p>
                  <div className="mt-3 flex justify-center space-x-4 sm:justify-start">
                    {profile.website && (
                      <a 
                        href={profile.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Website
                      </a>
                    )}
                    {profile.twitter && (
                      <a 
                        href={`https://twitter.com/${profile.twitter}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Edit Form */}
            <div className="mt-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Website
                  </label>
                  <input
                    type="text"
                    id="website"
                    value={profile.website}
                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Twitter Handle
                  </label>
                  <input
                    type="text"
                    id="twitter"
                    value={profile.twitter}
                    onChange={(e) => setProfile({...profile, twitter: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <button
                  onClick={handleSaveProfile}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Save Profile
                </button>
              </div>
            </div>

            {/* Badges Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Badges</h2>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Badges earned by completing skill challenges
              </p>
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
                </div>
              ) : badges.length === 0 ? (
                <div className="mt-4 rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
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
                  className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
          </motion.div>
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