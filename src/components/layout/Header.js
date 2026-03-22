'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import styles from './Header.module.css';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef(null);
  const avatarRef = useRef(null);

  const navLinks = [
    { href: '/repair', label: 'Repair' },
    { href: '/donate', label: 'Donate' },
    { href: '/profile', label: 'Profile' },
  ];

  // Close drawer on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setAvatarDropdown(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Mobile: Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/logo.png"
              alt="Dosth — Your Friend, Your Guide"
              width={110}
              height={36}
              className={styles.logoImage}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>
            {/* Bell */}
            <Link href="/notifications" className={styles.bellBtn} aria-label="Notifications (2 unread)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className={styles.bellBadge}>2</span>
            </Link>

            {/* Dark mode toggle — desktop only */}
            <span className={styles.themeToggleDesktop}>
              <ThemeToggle />
            </span>

            {/* Avatar with dropdown — desktop */}
            <div className={styles.avatarWrapper} ref={avatarRef}>
              <button
                className={styles.avatarBtn}
                onClick={() => setAvatarDropdown(!avatarDropdown)}
                aria-label="User menu"
              >
                <Avatar name="Rahul K" size="sm" />
              </button>
              {avatarDropdown && (
                <div className={styles.avatarDropdown}>
                  <Link href="/profile" className={styles.dropdownItem} onClick={() => setAvatarDropdown(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                    Profile
                  </Link>
                  <Link href="/repair/status?step=pickup_scheduled" className={styles.dropdownItem} onClick={() => setAvatarDropdown(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    My Orders
                  </Link>
                  <div className={styles.dropdownDivider} />
                  <Link href="/login" className={`${styles.dropdownItem} ${styles.dropdownLogout}`} onClick={() => setAvatarDropdown(false)}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className={styles.overlay}
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`} ref={drawerRef} aria-label="Navigation menu">
        <div className={styles.drawerHeader}>
          <div className={styles.drawerUser}>
            <Avatar name="Rahul K" size="md" />
            <div>
              <p className={styles.drawerName}>Rahul K.</p>
              <p className={styles.drawerPhone}>+91 98765 43210</p>
            </div>
          </div>
          <button
            className={styles.drawerClose}
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className={styles.drawerNav}>
          {[
            { href: '/', label: 'Home', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
            { href: '/repair', label: 'Repair', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg> },
            { href: '/donate', label: 'Donate', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> },
            { href: '/profile', label: 'Profile', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
            { href: '/notifications', label: 'Notifications', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.drawerLink} ${isActive(link.href) ? styles.drawerLinkActive : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.drawerFooter}>
          <div className={styles.drawerThemeRow}>
            <span>Dark Mode</span>
            <ThemeToggle compact />
          </div>
          <Link href="/login" className={styles.drawerLogout} onClick={() => setDrawerOpen(false)}>
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}
