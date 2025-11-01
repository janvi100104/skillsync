'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { 
  Trophy, 
  Medal, 
  Award, 
  Users, 
  TrendingUp, 
  Filter,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LeaderboardEntry {
  id: string;
  name: string;
  wallet: string;
  badgeCount: number;
  rank: number;
  change: number; // Change in rank from last week
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Simulate fetching leaderboard data
      const sampleLeaders: LeaderboardEntry[] = [
        {
          id: '1',
          name: 'Alex Johnson',
          wallet: '0x742d...8f3c',
          badgeCount: 24,
          rank: 1,
          change: 0
        },
        {
          id: '2',
          name: 'Sam Chen',
          wallet: '0xa83f...2b1d',
          badgeCount: 19,
          rank: 2,
          change: 1
        },
        {
          id: '3',
          name: 'Maria Garcia',
          wallet: '0xf2c1...9e4a',
          badgeCount: 17,
          rank: 3,
          change: -1
        },
        {
          id: '4',
          name: 'Jordan Smith',
          wallet: '0x3d9b...1c7e',
          badgeCount: 15,
          rank: 4,
          change: 0
        },
        {
          id: '5',
          name: 'Taylor Kim',
          wallet: '0x6e44...a2f8',
          badgeCount: 14,
          rank: 5,
          change: 2
        },
        {
          id: '6',
          name: 'Casey Brown',
          wallet: '0xb7d2...5c3f',
          badgeCount: 12,
          rank: 6,
          change: -1
        },
        {
          id: '7',
          name: 'Riley Davis',
          wallet: '0x2c8a...7d9b',
          badgeCount: 11,
          rank: 7,
          change: 0
        },
        {
          id: '8',
          name: 'Morgan Wilson',
          wallet: '0x9f1e...4a6c',
          badgeCount: 9,
          rank: 8,
          change: 1
        },
        {
          id: '9',
          name: 'Jamie Miller',
          wallet: '0xd4a7...3b2e',
          badgeCount: 8,
          rank: 9,
          change: -2
        },
        {
          id: '10',
          name: 'Alex Thompson',
          wallet: '0x8c3f...1d9a',
          badgeCount: 7,
          rank: 10,
          change: 0
        }
      ];
      
      setTimeout(() => {
        setLeaders(sampleLeaders);
        setLoading(false);
      }, 1000);
    }
  }, [isClient, timeRange]);

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  // Stats for the leaderboard
  const totalUsers = leaders.length;
  const topUser = leaders[0];
  const avgBadges = leaders.length > 0 
    ? Math.round(leaders.reduce((sum, user) => sum + user.badgeCount, 0) / leaders.length)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center">
            <Trophy className="h-10 w-10 text-yellow-500" />
            <h1 className="ml-3 text-3xl font-bold text-gray-900 dark:text-white">
              Community Leaderboard
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Top badge earners in our community
          </p>
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
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
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
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Badges</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgBadges}</p>
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
                <Crown className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Earner</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {topUser ? topUser.name : 'N/A'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Time Range Filter */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Leaderboard Rankings
          </h2>
          <div className="flex space-x-2">
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              onClick={() => setTimeRange('week')}
              size="sm"
            >
              This Week
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'outline'}
              onClick={() => setTimeRange('month')}
              size="sm"
            >
              This Month
            </Button>
            <Button
              variant={timeRange === 'all' ? 'default' : 'outline'}
              onClick={() => setTimeRange('all')}
              size="sm"
            >
              All Time
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg bg-white shadow dark:bg-gray-800">
              {/* Leaderboard Header */}
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="grid grid-cols-12 gap-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5">User</div>
                  <div className="col-span-3 text-center">Badges</div>
                  <div className="col-span-3 text-right">Change</div>
                </div>
              </div>
              
              {/* Leaderboard Entries */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {leaders.map((leader, index) => (
                  <motion.div
                    key={leader.id}
                    className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="col-span-1 flex items-center">
                      {leader.rank <= 3 ? (
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          leader.rank === 1 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' 
                            : leader.rank === 2 
                              ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500'
                        }`}>
                          {leader.rank === 1 ? <Crown className="h-4 w-4" /> : leader.rank}
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center text-gray-500 dark:text-gray-400">
                          {leader.rank}
                        </div>
                      )}
                    </div>
                    
                    <div className="col-span-5">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {leader.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {leader.wallet}
                      </div>
                    </div>
                    
                    <div className="col-span-3 flex items-center justify-center">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        <Award className="mr-1 h-4 w-4" />
                        {leader.badgeCount}
                      </span>
                    </div>
                    
                    <div className="col-span-3 flex items-center justify-end">
                      {leader.change !== 0 ? (
                        <span className={`inline-flex items-center text-sm font-medium ${
                          leader.change > 0 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {leader.change > 0 ? '↑' : '↓'} {Math.abs(leader.change)}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          —
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-8 text-center">
              <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
                <h3 className="text-2xl font-bold">Want to Climb the Leaderboard?</h3>
                <p className="mt-2 text-lg opacity-90">
                  Earn more badges to improve your ranking and showcase your skills
                </p>
                <Button 
                  className="mt-6 bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => window.location.href = '/mint'}
                >
                  Mint More Badges
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}