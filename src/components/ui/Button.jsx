import Link from 'next/link';

const isInternal = (href = '') => href.startsWith('/') && !href.startsWith('//');

/**
 * Polymorphic button/link. Renders a Next <Link> for internal routes
 * (e.g. "/booking") and a plain <a> for tel:/https:// links, or a
 * <button> when no href is given (for in-page actions like form submit).
 */
export default function Button({
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size,
  block,
  icon,
  children,
  className = '',
  ariaLabel,
  disabled,
  target,
  rel,
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : '',
    block ? 'btn-block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (href && isInternal(href)) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={target}
        rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
