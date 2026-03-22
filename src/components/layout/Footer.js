import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Col 1: Brand */}
          <div className={styles.col}>
            <Link href="/" className={styles.logoLink}>
              <Image src="/logo.png" alt="Dosth" width={90} height={30} />
            </Link>
            <p className={styles.tagline}>Your Friend, Your Guide.</p>
            <div className={styles.socials}>
              {[
                { label: 'Instagram', href: '#', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                { label: 'Twitter', href: '#', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg> },
                { label: 'LinkedIn', href: '#', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
                { label: 'WhatsApp', href: '#', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg> },
              ].map(social => (
                <a key={social.label} href={social.href} className={styles.socialIcon} aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Services</h4>
            <nav className={styles.colLinks}>
              <Link href="/repair">Repair Hub</Link>
              <Link href="/donate">Donate</Link>
              <Link href="/#how-it-works">How It Works</Link>
              <Link href="/#stats">Pricing</Link>
            </nav>
          </div>

          {/* Col 3: Company */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Company</h4>
            <nav className={styles.colLinks}>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Press</a>
            </nav>
          </div>

          {/* Col 4: Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <nav className={styles.colLinks}>
              <a href="mailto:hello@dosth.in">hello@dosth.in</a>
              <span>Bengaluru, India</span>
              <a href="#">Help Center</a>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2025 Dosth Technologies Pvt Ltd</span>
          <span className={styles.madeIn}>Made with ♥ in India</span>
          <div className={styles.legal}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
