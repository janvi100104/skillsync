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
import { 
  User, 
  Mail, 
  Globe, 
  Twitter, 
  Linkedin, 
  Github, 
  Calendar, 
  Award, 
  Edit3,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [badges, setBadges] = useState<BadgeInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState<BadgeInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    website: '',
    twitter: '',
    linkedin: '',
    github: '',
    joinDate: ''
  });
  const [editedProfile, setEditedProfile] = useState(profile);
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
      // Fetch user badges from Kwala API
      const userBadges = await getBadges(address || '');
      setBadges(userBadges);
      
      // Simulate fetching user profile
      const userProfile = {
        name: 'Alex Johnson',
        bio: 'Web3 developer passionate about blockchain technology and decentralized applications. Currently working on NFT marketplaces and DeFi protocols.',
        website: 'https://alexjohnson.dev',
        twitter: '@alexjohnson',
        linkedin: 'alex-johnson',
        github: 'alexjohnson',
        joinDate: '2023-05-15'
      };
      
      setProfile(userProfile);
      setEditedProfile(userProfile);
    } catch (err: unknown) {
      console.error('Error fetching profile data:', err);
      let errorMessage = 'Failed to load profile data.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      // Still set some sample data even if there's an error
      const userProfile = {
        name: 'Alex Johnson',
        bio: 'Web3 developer passionate about blockchain technology and decentralized applications. Currently working on NFT marketplaces and DeFi protocols.',
        website: 'https://alexjohnson.dev',
        twitter: '@alexjohnson',
        linkedin: 'alex-johnson',
        github: 'alexjohnson',
        joinDate: '2023-05-15'
      };
      
      setProfile(userProfile);
      setEditedProfile(userProfile);
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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // In a real implementation, this would save the profile data to a backend
    alert('Profile saved successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
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
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Header */}
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <div className="flex flex-col md:flex-row">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl text-white">
                    {profile.name ? profile.name.charAt(0) : <User className="h-16 w-16" />}
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="mt-6 md:ml-8 md:mt-0 md:flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {profile.name || 'Anonymous User'}
                      </h1>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      {!isEditing ? (
                        <Button onClick={handleEdit} variant="outline">
                          <Edit3 className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </Button>
                          <Button onClick={handleCancel} variant="outline">
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <div className="mt-4">
                      <textarea
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  ) : (
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                      {profile.bio || 'No bio available'}
                    </p>
                  )}
                  
                  {/* Social Links */}
                  <div className="mt-6 flex flex-wrap gap-4">
                    {profile.website && (
                      <a 
                        href={profile.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Globe className="mr-1 h-4 w-4" />
                        Website
                      </a>
                    )}
                    {profile.twitter && (
                      <a 
                        href={`https://twitter.com/${profile.twitter}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Twitter className="mr-1 h-4 w-4" />
                        Twitter
                      </a>
                    )}
                    {profile.linkedin && (
                      <a 
                        href={`https://linkedin.com/in/${profile.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Linkedin className="mr-1 h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                    {profile.github && (
                      <a 
                        href={`https://github.com/${profile.github}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Github className="mr-1 h-4 w-4" />
                        GitHub
                      </a>
                    )}
                  </div>
                  
                  {/* Join Date */}
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="mr-1 h-4 w-4" />
                    Joined {new Date(profile.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Edit Form (when editing) */}
            {isEditing && (
              <motion.div 
                className="mt-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Profile</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
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
                      value={editedProfile.website}
                      onChange={(e) => setEditedProfile({...editedProfile, website: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Twitter Handle
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
                        @
                      </span>
                      <input
                        type="text"
                        id="twitter"
                        value={editedProfile.twitter}
                        onChange={(e) => setEditedProfile({...editedProfile, twitter: e.target.value})}
                        className="block w-full flex-1 rounded-none rounded-r-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      id="linkedin"
                      value={editedProfile.linkedin}
                      onChange={(e) => setEditedProfile({...editedProfile, linkedin: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="username"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      GitHub
                    </label>
                    <input
                      type="text"
                      id="github"
                      value={editedProfile.github}
                      onChange={(e) => setEditedProfile({...editedProfile, github: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="username"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stats Section */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                    <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Badges</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{badges.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div className="flex items-center">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                    <User className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rank</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">#12</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div className="flex items-center">
                  <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Member Since</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {new Date(profile.joinDate).getFullYear()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div className="mt-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
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
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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