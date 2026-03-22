'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import styles from './page.module.css';

const notifications = [
  { id: 1, type: 'order', title: 'Repair Started', text: 'Technician has started working on your Electronics repair.', time: '10m ago', unread: true, icon: '⚙️' },
  { id: 2, type: 'offer', title: 'Weekend Special', text: 'Get 20% off on all home cleaning services this weekend!', time: '2h ago', unread: true, icon: '🎁' },
  { id: 3, type: 'system', title: 'Payment Successful', text: 'Advance payment of ₹800 received for Order #429.', time: '5h ago', unread: false, icon: '✅' },
  { id: 4, type: 'community', title: 'Donation Impact', text: 'Robin Hood Army distributed your food donation to 30 people!', time: 'Yesterday', unread: false, icon: '❤️' },
  { id: 5, type: 'order', title: 'Pickup Scheduled', text: 'Your pickup is scheduled for tomorrow at 10:00 AM.', time: '1 day ago', unread: false, icon: '🛵' },
];

export default function NotificationsPage() {
  const [list, setList] = useState(notifications);

  const markAllRead = () => {
    setList(list.map(n => ({ ...n, unread: false })));
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <h1 className={styles.title}>Notifications</h1>
            <Button variant="ghost" size="small" onClick={markAllRead}>Mark all as read</Button>
          </div>

          <div className={styles.list}>
            {list.map(notif => (
              <div key={notif.id} className={`${styles.item} ${notif.unread ? styles.itemUnread : ''}`}>
                <div className={styles.iconBox}>
                  <span style={{fontSize: '1.25rem'}}>{notif.icon}</span>
                </div>
                <div className={styles.content}>
                  <div className={styles.itemHeader}>
                    <h3 className={styles.itemTitle}>{notif.title}</h3>
                    <span className={styles.time}>{notif.time}</span>
                  </div>
                  <p className={styles.text}>{notif.text}</p>
                </div>
                {notif.unread && <div className={styles.unreadDot} />}
              </div>
            ))}
          </div>

          <div className={styles.emptyState}>
            <p>You&apos;re all caught up! ✨</p>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
