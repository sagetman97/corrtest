import { ProductLogo } from './PollyLogo';

interface LoadingLogoProps {
  size?: number;
  message?: string;
}

export function LoadingLogo({ size = 48, message = 'Loading...' }: LoadingLogoProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-pulse mb-4">
        <ProductLogo
          size={size}
          productColor="#01FFF0"
          variant="light"
        />
      </div>
      {message && (
        <div className="text-sm text-muted-foreground">{message}</div>
      )}
    </div>
  );
}
