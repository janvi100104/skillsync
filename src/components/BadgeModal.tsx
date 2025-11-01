'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BadgeInfo } from '@/types';
import { Button } from '@/components/ui/button';
import { X, Share2, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface BadgeModalProps {
  badge: BadgeInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BadgeModal({ badge, isOpen, onClose }: BadgeModalProps) {
  if (!badge) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}/badge/${badge.id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Badge link copied to clipboard",
    });
  };

  const handleShareTwitter = () => {
    const url = `${window.location.origin}/badge/${badge.id}`;
    const text = `I just earned the "${badge.name}" badge on SkillSync! Check it out:`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = `${window.location.origin}/badge/${badge.id}`;
    const title = `I just earned the ${badge.name} badge on SkillSync!`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(linkedinUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 dark:bg-gray-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="mb-4 flex justify-center">
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                {badge.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={badge.image} 
                    alt={badge.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                    <div className="text-6xl text-white">
                      🏆
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{badge.name}</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{badge.description}</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium text-gray-900 dark:text-white">{badge.category || 'Skill'}</p>
                </div>
                
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
                  <p className="font-medium text-gray-900 dark:text-white">{badge.level || 'Beginner'}</p>
                </div>
                
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date Earned</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(badge.date).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Badge ID</p>
                  <p className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                    {badge.id.slice(0, 8)}...
                  </p>
                </div>
              </div>
              
              {/* Sharing Section */}
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Share this badge</p>
                <div className="mt-2 flex justify-center space-x-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleCopyLink}
                    title="Copy link"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleShareTwitter}
                    title="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleShareLinkedIn}
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}