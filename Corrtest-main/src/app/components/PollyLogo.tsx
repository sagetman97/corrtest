import lightLogo from '@/imports/image-4.png';
import darkLogo from '@/imports/image-8.png';
import lightWordmark from '@/imports/wordmark-light.svg';
import darkWordmark from '@/imports/wordmark-dark.svg';

/**
 * Polly Logo - Main brand mark
 *
 * The Polly logo consists of a "P" lettermark with a diagonal cyan slash.
 * Available in standardized sizes: 74, 128, 192, 347, 588 pixels
 *
 * @param size - Logo size in pixels (74 | 128 | 192 | 347 | 588)
 * @param variant - Color variant: 'light' (black P) or 'dark' (white P)
 * @param className - Optional CSS classes
 *
 * @example
 * // Light mode (black P with cyan slash)
 * <PollyLogo size={128} variant="light" />
 *
 * @example
 * // Dark mode (white P with cyan slash)
 * <PollyLogo size={192} variant="dark" />
 */
interface PollyLogoProps {
  size?: 74 | 128 | 192 | 347 | 588;
  variant?: 'light' | 'dark';
  className?: string;
}

export function PollyLogo({ size = 128, variant = 'light', className = '' }: PollyLogoProps) {
  const logoSrc = variant === 'light' ? lightLogo : darkLogo;

  return (
    <img
      src={logoSrc}
      alt="Polly Logo"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
}

/**
 * Polly Wordmark - Full text logo
 *
 * Complete "POLLY" text with cyan accent element.
 * Use for larger displays, headers, or when text clarity is needed.
 *
 * @param variant - Color variant: 'light' or 'dark'
 * @param className - Optional CSS classes
 *
 * @example
 * <PollyWordmark variant="light" />
 */
interface PollyWordmarkProps {
  variant?: 'light' | 'dark';
  size?: number;
  className?: string;
}

export function PollyWordmark({ variant = 'light', size = 24, className = '' }: PollyWordmarkProps) {
  const wordmarkSrc = variant === 'dark' ? darkWordmark : lightWordmark;

  return (
    <img
      src={wordmarkSrc}
      alt="Polly Wordmark"
      className={className}
      style={{ height: `${size}px`, width: 'auto', objectFit: 'contain' }}
    />
  );
}

/**
 * Product Logo - Compact version for UI elements
 *
 * Smaller, icon-only version of the Polly logo optimized for navigation,
 * buttons, and inline use. Supports product differentiation via color accent.
 *
 * @param size - Logo size in pixels (flexible, default 20)
 * @param productColor - Color accent for product differentiation (shows as subtle border)
 *   - Pricing Engine: #01FFF0 (cyan)
 *   - Exchange: #FFD601 (yellow)
 *   - Analytics: #FF54D9 (magenta)
 *   - Hedge: #6FCF97 (green)
 *   - AI: #9B51E0 (purple)
 * @param variant - 'light' (black P) or 'dark' (white P)
 * @param className - Optional CSS classes
 *
 * @example
 * // Default Polly cyan
 * <ProductLogo size={20} productColor="#01FFF0" variant="dark" />
 *
 * @example
 * // Exchange product (yellow accent)
 * <ProductLogo size={24} productColor="#FFD601" variant="light" />
 */
interface ProductLogoProps {
  size?: number;
  productColor?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export function ProductLogo({
  size = 20,
  productColor = '#01FFF0',
  variant = 'light',
  className = ''
}: ProductLogoProps) {
  const logoSrc = variant === 'light' ? lightLogo : darkLogo;
  const showColorAccent = productColor && productColor !== '#01FFF0';

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        ...(showColorAccent && {
          borderRadius: '4px',
          border: `2px solid ${productColor}20`,
          padding: '2px'
        })
      }}
    >
      <img
        src={logoSrc}
        alt="Polly Product Logo"
        style={{
          width: showColorAccent ? size - 8 : size,
          height: showColorAccent ? size - 8 : size,
          display: 'block',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}
