import Button from './Button';
import { PhoneIcon, WhatsappIcon, CalendarCheckIcon } from './Icons';
import { site } from '@/data/site';

export function CallButton({ variant = 'secondary', size, block, className, label = 'Call Now' }) {
  return (
    <Button
      href={site.phoneHref}
      variant={variant}
      size={size}
      block={block}
      className={className}
      icon={<PhoneIcon />}
      ariaLabel={`Call Coolviro Services at ${site.phoneDisplay}`}
    >
      {label}
    </Button>
  );
}

export function WhatsappButton({
  variant = 'whatsapp',
  size,
  block,
  className,
  label = 'WhatsApp Us',
  message,
}) {
  return (
    <Button
      href={site.whatsappHrefWithText(message)}
      variant={variant}
      size={size}
      block={block}
      className={className}
      icon={<WhatsappIcon />}
      target="_blank"
      ariaLabel="Chat with Coolviro Services on WhatsApp"
    >
      {label}
    </Button>
  );
}

export function BookButton({
  variant = 'primary',
  size,
  block,
  className,
  label = 'Book a Service',
  href = '/booking',
}) {
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      block={block}
      className={className}
      icon={<CalendarCheckIcon width="20" height="20" />}
      ariaLabel="Book a service with Coolviro Services"
    >
      {label}
    </Button>
  );
}
