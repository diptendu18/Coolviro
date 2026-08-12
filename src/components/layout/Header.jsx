import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mainNavLinks } from '@/data/site';
import Logo from '@/components/ui/Logo';
import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';
import { MenuIcon } from '@/components/ui/Icons';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  return (
    <>
      <header className="site-header">
        <div className="container site-header-inner">
          <Link href="/" className="site-header-logo" aria-label="Coolviro Services — Home">
            <Logo size={38} priority />
          </Link>

          <nav className="site-header-nav" aria-label="Primary">
            <ul>
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={router.pathname === link.href ? 'is-active' : ''}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header-ctas">
            <CallButton variant="ghost" size="sm" />
            <WhatsappButton size="sm" />
            <BookButton size="sm" label="Book Online" />
          </div>

          <button
            type="button"
            className="site-header-hamburger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>
      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
      <style jsx>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: saturate(180%) blur(10px);
          border-bottom: 1px solid var(--color-border);
        }
        .site-header-inner {
          height: var(--header-height);
          display: flex;
          align-items: center;
          gap: var(--space-6);
        }
        .site-header-logo {
          display: inline-flex;
          margin-right: auto;
        }
        .site-header-nav ul {
          list-style: none;
          display: flex;
          gap: var(--space-6);
        }
        .site-header-nav a {
          font-weight: 600;
          color: var(--color-text);
          padding: var(--space-2) 0;
          position: relative;
        }
        .site-header-nav a:hover,
        .site-header-nav a.is-active {
          color: var(--color-primary);
        }
        .site-header-nav a.is-active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 2px;
          background: var(--gradient-primary);
          border-radius: 2px;
        }
        .site-header-ctas {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .site-header-hamburger {
          display: none;
          background: transparent;
          border: none;
          color: var(--color-text);
          cursor: pointer;
          padding: var(--space-2);
        }
        @media (max-width: 960px) {
          .site-header-nav,
          .site-header-ctas {
            display: none;
          }
          .site-header-hamburger {
            display: inline-flex;
          }
          .site-header-inner {
            height: var(--header-height-mobile);
          }
        }
      `}</style>
    </>
  );
}
