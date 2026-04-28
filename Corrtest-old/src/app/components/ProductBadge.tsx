import { ProductLogo } from './PollyLogo';

interface ProductBadgeProps {
  product: 'pricing-engine' | 'exchange' | 'analytics' | 'hedge' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const productConfig = {
  'pricing-engine': {
    color: '#01FFF0',
    label: 'Pricing Engine',
    shortLabel: 'PPE',
  },
  'exchange': {
    color: '#FFD601',
    label: 'Exchange',
    shortLabel: 'LTE',
  },
  'analytics': {
    color: '#FF54D9',
    label: 'Analytics',
    shortLabel: 'Analytics',
  },
  'hedge': {
    color: '#6FCF97',
    label: 'Hedge',
    shortLabel: 'Hedge',
  },
  'ai': {
    color: '#9B51E0',
    label: 'Polly AI',
    shortLabel: 'AI',
  },
};

export function ProductBadge({
  product,
  size = 'md',
  showLabel = true,
  className = ''
}: ProductBadgeProps) {
  const config = productConfig[product];

  const sizeMap = {
    sm: { logo: 16, text: 'text-xs', padding: 'px-2 py-1', gap: 'gap-1.5' },
    md: { logo: 20, text: 'text-sm', padding: 'px-2.5 py-1.5', gap: 'gap-2' },
    lg: { logo: 24, text: 'text-base', padding: 'px-3 py-2', gap: 'gap-2.5' },
  };

  const sizes = sizeMap[size];

  if (!showLabel) {
    return (
      <div className={className}>
        <ProductLogo
          size={sizes.logo}
          productColor={config.color}
          variant="light"
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center ${sizes.gap} ${sizes.padding} bg-card border border-border ${className}`}
      style={{ borderRadius: 'var(--radius-xs)' }}
    >
      <ProductLogo
        size={sizes.logo}
        productColor={config.color}
        variant="light"
      />
      <span className={`${sizes.text} font-medium`} style={{ color: config.color }}>
        {config.shortLabel}
      </span>
    </div>
  );
}
