'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { 
  Home, 
  LayoutDashboard, 
  PlusCircle, 
  Image, 
  Trophy, 
  User 
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { address } = useAccount();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }
  
  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      exact: true
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      exact: false
    },
    {
      name: 'Mint Badge',
      href: '/mint',
      icon: PlusCircle,
      exact: false
    },
    {
      name: 'Gallery',
      href: '/gallery',
      icon: Image,
      exact: false
    },
    {
      name: 'Leaderboard',
      href: '/leaderboard',
      icon: Trophy,
      exact: false
    }
  ];

  return (
    <nav className="border-b bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-xl font-bold text-blue-600">
              SkillSync
            </Link>
            <div className="ml-6 hidden md:flex md:space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact 
                  ? pathname === item.href 
                  : pathname?.startsWith(item.href);
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      isActive
                        ? 'border-blue-500 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            {address && (
              <Link 
                href="/profile" 
                className="mr-4 hidden text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white md:block"
              >
                <div className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  Profile
                </div>
              </Link>
            )}
            <ConnectButton 
              showBalance={false}
              chainStatus="icon"
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 md:hidden">
        <div className="flex justify-around px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname?.startsWith(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center rounded-lg px-2 py-1 text-xs font-medium ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="mt-1">{item.name}</span>
              </Link>
            );
          })}
          {address && (
            <Link 
              href="/profile" 
              className="flex flex-col items-center rounded-lg px-2 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <User className="h-5 w-5" />
              <span className="mt-1">Profile</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}