import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { mainNavLinks, site, topBrandLogos } from '@/data/site';
import { services } from '@/data/services';
import Logo from '@/components/ui/Logo';
import { BookButton } from '@/components/ui/CTAButtons';
import {
  MenuIcon,
  ChevronDownIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UsersIcon,
  BadgeCheckIcon,
} from '@/components/ui/Icons';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  return (
    <>
      <div className="site-topbar">
        <div className="container site-topbar-inner">
          <ul className="site-topbar-stats">
            <li>
              <ShieldCheckIcon width="16" height="16" /> {site.experienceHighlight}
            </li>
            <li>
              <UsersIcon width="16" height="16" /> {site.customersHighlight}
            </li>
            <li>
              <BadgeCheckIcon width="16" height="16" /> {site.warrantyHighlight}
            </li>
          </ul>
          <div className="site-topbar-brands">
            <span className="site-topbar-brands-label">We Repair All Major Brands</span>
            <ul className="site-topbar-brands-list">
              {topBrandLogos.map((brand) => (
                <li key={brand.name} className="site-topbar-brand-logo">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={brand.width}
                    height={brand.height}
                    sizes="80px"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container site-header-inner">
          <Link href="/" className="site-header-logo" aria-label="Coolviro Services — Home">
            <Logo size={38} priority />
          </Link>

          <nav className="site-header-nav" aria-label="Primary">
            <ul>
              {mainNavLinks.map((link) => {
                const isServices = link.href === '/services';
                return (
                  <li key={link.href} className={isServices ? 'has-dropdown' : ''}>
                    <Link
                      href={link.href}
                      className={router.pathname === link.href ? 'is-active' : ''}
                    >
                      {link.label}
                      {isServices && <ChevronDownIcon width="14" height="14" />}
                    </Link>
                    {isServices && (
                      <div className="site-header-dropdown">
                        <ul>
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link href={`/services/${service.slug}`}>{service.name}</Link>
                            </li>
                          ))}
                          <li className="site-header-dropdown-all">
                            <Link href="/services">View All Services</Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="site-header-ctas">
            <a href={site.phoneHref} className="site-header-phone">
              <span className="site-header-phone-icon">
                <PhoneIcon width="18" height="18" />
              </span>
              <span className="site-header-phone-text">
                <small>Call Us Anytime</small>
                <strong>{site.phoneDisplay}</strong>
              </span>
            </a>
            <BookButton size="sm" label="Book Service" />
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
        .site-topbar {
          background: var(--gradient-hero);
          color: #fff;
          font-size: 0.78rem;
          font-weight: 600;
        }
        .site-topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-3) var(--space-5);
          padding: var(--space-2) var(--space-5);
        }
        .site-topbar-stats {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2) var(--space-5);
          flex-shrink: 0;
        }
        .site-topbar-stats li {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .site-topbar-brands {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-2) var(--space-3);
          min-width: 0;
        }
        .site-topbar-brands-label {
          color: #fff;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .site-topbar-brands-list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          margin: 0;
          padding: 0;
        }
        .site-topbar-brand-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          height: 24px;
          padding: 3px 8px;
          flex-shrink: 0;
        }
        .site-topbar-brand-logo :global(img) {
          display: block;
          height: 100%;
          width: auto;
          object-fit: contain;
        }
        @media (max-width: 720px) {
          .site-topbar {
            display: none;
          }
        }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: saturate(180%) blur(10px);
          border-bottom: 1px solid var(--color-border);
        }
        .site-header-inner {
          height: var(--header-height);
          display: flex;
          align-items: center;
          gap: var(--space-5);
        }
        :global(.site-header-logo) {
          display: inline-flex;
          margin-right: auto;
        }
        .site-header-nav ul {
          list-style: none;
          display: flex;
          gap: var(--space-5);
        }
        .site-header-nav li {
          position: relative;
        }
        .site-header-nav :global(a) {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
          color: var(--color-text);
          padding: var(--space-2) 0;
          position: relative;
        }
        .site-header-nav :global(a:hover),
        .site-header-nav :global(a.is-active) {
          color: var(--color-primary);
        }
        .site-header-nav :global(a.is-active::after) {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 2px;
          background: var(--gradient-primary);
          border-radius: 2px;
        }
        .site-header-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 240px;
          background: #fff;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--color-border);
          padding: var(--space-2);
          opacity: 0;
          visibility: hidden;
          transform: translateY(6px);
          transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
        }
        .has-dropdown:hover .site-header-dropdown,
        .has-dropdown:focus-within .site-header-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .site-header-dropdown ul {
          list-style: none;
          display: flex;
          flex-direction: column;
        }
        .site-header-dropdown :global(a) {
          display: block;
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-sm);
          font-size: 0.92rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .site-header-dropdown :global(a:hover) {
          background: var(--color-bg-section);
        }
        .site-header-dropdown-all {
          border-top: 1px solid var(--color-border);
          margin-top: var(--space-1);
          padding-top: var(--space-1);
        }
        .site-header-dropdown-all :global(a) {
          color: var(--color-primary);
        }
        .site-header-ctas {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }
        .site-header-phone {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--color-text);
        }
        .site-header-phone-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background: var(--color-bg-section);
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .site-header-phone-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .site-header-phone-text small {
          font-size: 0.72rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }
        .site-header-phone-text strong {
          font-size: 0.92rem;
        }
        .site-header-hamburger {
          display: none;
          background: transparent;
          border: none;
          color: var(--color-text);
          cursor: pointer;
          padding: var(--space-2);
        }
        @media (max-width: 1180px) {
          .site-header-phone-text {
            display: none;
          }
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
