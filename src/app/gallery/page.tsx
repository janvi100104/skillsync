'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { BadgeCard } from '@/components/BadgeCard';
import { BadgeModal } from '@/components/BadgeModal';
import { BadgeInfo } from '@/types';
import { Search, Filter } from 'lucide-react';

export default function Gallery() {
  const [badges, setBadges] = useState<BadgeInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<BadgeInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchAllBadges = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would fetch all badges from the system
      // For demo purposes, we'll simulate with sample data
      const sampleBadges: BadgeInfo[] = [
        {
          id: '1',
          name: 'Web3 Developer',
          description: 'Verified skills in blockchain development and smart contracts',
          image: '',
          date: '2023-06-15',
          category: 'Development',
          level: 'Intermediate'
        },
        {
          id: '2',
          name: 'Smart Contract Auditor',
          description: 'Expert in reviewing and securing smart contracts',
          image: '',
          date: '2023-07-22',
          category: 'Security',
          level: 'Advanced'
        },
        {
          id: '3',
          name: 'DeFi Specialist',
          description: 'Mastery in decentralized finance protocols and mechanisms',
          image: '',
          date: '2023-08-05',
          category: 'Finance',
          level: 'Expert'
        },
        {
          id: '4',
          name: 'NFT Creator',
          description: 'Skilled in creating and deploying NFT collections',
          image: '',
          date: '2023-09-12',
          category: 'Art',
          level: 'Intermediate'
        },
        {
          id: '5',
          name: 'DAO Governor',
          description: 'Active participant in decentralized autonomous organizations',
          image: '',
          date: '2023-10-18',
          category: 'Governance',
          level: 'Advanced'
        },
        {
          id: '6',
          name: 'Blockchain Architect',
          description: 'Designed scalable blockchain solutions and infrastructures',
          image: '',
          date: '2023-11-30',
          category: 'Architecture',
          level: 'Expert'
        },
        {
          id: '7',
          name: 'Solidity Developer',
          description: 'Proficient in writing secure Solidity smart contracts',
          image: '',
          date: '2023-12-05',
          category: 'Development',
          level: 'Intermediate'
        },
        {
          id: '8',
          name: 'Tokenomics Expert',
          description: 'Specialist in designing token economic models',
          image: '',
          date: '2023-12-18',
          category: 'Finance',
          level: 'Advanced'
        }
      ];
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(sampleBadges.map(badge => badge.category).filter(Boolean))] as string[];
      setCategories(uniqueCategories);
      
      // Simulate API delay
      setTimeout(() => {
        setBadges(sampleBadges);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error fetching badges:', err);
      setError('Failed to load badges. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isClient) {
      fetchAllBadges();
    }
  }, [isClient]);

  // Filter badges based on search term and category
  const filteredBadges = useMemo(() => {
    return badges.filter(badge => {
      const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           badge.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || badge.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [badges, searchTerm, filterCategory]);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Badge Gallery</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Explore the skill badges earned by our community
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-grow">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                title="Filter by category"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button
              onClick={fetchAllBadges}
              className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ) : filteredBadges.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No badges found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredBadges.map((badge, index) => (
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