import { ProductLogo } from './PollyLogo';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  productColor?: string;
  showLogo?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  productColor = '#01FFF0',
  showLogo = false
}: PageHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2.5 mb-1">
        {showLogo && (
          <ProductLogo size={20} productColor={productColor} variant="light" />
        )}
        <h1 className="text-xl">{title}</h1>
      </div>
      {subtitle && (
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      )}
    </div>
  );
}
