'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { BadgeCard } from '@/components/BadgeCard';
import { BadgeModal } from '@/components/BadgeModal';
import { BadgeInfo } from '@/types';
import { Search, Filter, Grid, List, Trophy, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Gallery() {
  const [badges, setBadges] = useState<BadgeInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<BadgeInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
        },
        {
          id: '9',
          name: 'Layer 2 Wizard',
          description: 'Master of scaling solutions and Layer 2 protocols',
          image: '',
          date: '2024-01-10',
          category: 'Scalability',
          level: 'Expert'
        },
        {
          id: '10',
          name: 'Wallet Security Pro',
          description: 'Expert in wallet security and key management',
          image: '',
          date: '2024-01-22',
          category: 'Security',
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

  // Filter and sort badges
  const filteredAndSortedBadges = useMemo(() => {
    let result = [...badges];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(badge => 
        badge.name.toLowerCase().includes(term) || 
        badge.description.toLowerCase().includes(term) ||
        (badge.category && badge.category.toLowerCase().includes(term))
      );
    }
    
    // Filter by category
    if (filterCategory !== 'All') {
      result = result.filter(badge => badge.category === filterCategory);
    }
    
    // Sort badges
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'category':
          return (a.category || '').localeCompare(b.category || '');
        default:
          return 0;
      }
    });
    
    return result;
  }, [badges, searchTerm, filterCategory, sortBy]);

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

  // Stats for the gallery
  const totalBadges = badges.length;
  const uniqueCategories = [...new Set(badges.map(b => b.category).filter(Boolean))].length;
  const latestBadgeDate = badges.length > 0 
    ? new Date(Math.max(...badges.map(b => new Date(b.date).getTime()))).toLocaleDateString()
    : 'N/A';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Badge Gallery</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Explore skill badges earned by our community
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Badges</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{totalBadges}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{uniqueCategories}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Latest Badge</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{latestBadgeDate}</p>
              </div>
            </div>
          </div>
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
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                title="Sort badges"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
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
            <Button
              onClick={fetchAllBadges}
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        ) : filteredAndSortedBadges.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center shadow dark:bg-gray-800">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
              <Search className="h-8 w-8 text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No badges found</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredAndSortedBadges.map((badge, index) => (
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
        ) : (
          <div className="rounded-lg bg-white shadow dark:bg-gray-800">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedBadges.map((badge, index) => (
                <motion.li
                  key={badge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => handleBadgeClick(badge)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        <Trophy className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{badge.name}</h3>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {badge.level}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{badge.category}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(badge.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
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