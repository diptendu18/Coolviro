import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { mainNavLinks, site } from '@/data/site';
import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';
import { CloseIcon } from '@/components/ui/Icons';

export default function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open, onClose]);

  return (
    <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button
        type="button"
        className="mobile-menu-backdrop"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <div
        className="mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button
            type="button"
            className="mobile-menu-close"
            onClick={onClose}
            ref={closeBtnRef}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
          >
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile primary">
          <ul className="mobile-menu-links">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={onClose} tabIndex={open ? 0 : -1}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu-ctas">
          <BookButton block onClick={onClose} label="Book Online" />
          <CallButton variant="secondary" block />
          <WhatsappButton block />
        </div>
        <p className="mobile-menu-hours">Open {site.workingHours}</p>
      </div>
      <style jsx>{`
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 200;
          visibility: hidden;
          pointer-events: none;
          overflow: hidden;
        }
        .mobile-menu.is-open {
          visibility: visible;
          pointer-events: auto;
        }
        .mobile-menu-backdrop {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 22, 55, 0.5);
          border: none;
          padding: 0;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .mobile-menu.is-open .mobile-menu-backdrop {
          opacity: 1;
        }
        .mobile-menu-panel {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 88vw;
          max-width: 340px;
          background: #fff;
          box-shadow: var(--shadow-lg);
          padding: var(--space-5);
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          transform: translateX(100%);
          transition: transform 0.25s ease;
          overflow-y: auto;
        }
        .mobile-menu.is-open .mobile-menu-panel {
          transform: translateX(0);
        }
        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mobile-menu-title {
          font-weight: 800;
          font-size: 1.1rem;
        }
        .mobile-menu-close {
          background: var(--color-bg-section);
          border: none;
          border-radius: var(--radius-full);
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-text);
        }
        .mobile-menu-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .mobile-menu-links a {
          display: block;
          padding: var(--space-3) var(--space-2);
          font-weight: 700;
          font-size: 1.1rem;
          border-radius: var(--radius-sm);
        }
        .mobile-menu-links a:hover {
          background: var(--color-bg-section);
          color: var(--color-primary);
        }
        .mobile-menu-ctas {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          margin-top: auto;
        }
        .mobile-menu-hours {
          text-align: center;
          font-size: 0.85rem;
          margin: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .mobile-menu-panel,
          .mobile-menu-backdrop {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
