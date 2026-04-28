import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faFileLines,
  faChartLine,
  faChartColumn,
  faLayerGroup,
  faTruck,
  faWandMagicSparkles,
  faNetworkWired,
  faGear,
  faLifeRing,
  faLock,
  faDollarSign,
  faClock,
  faCircleExclamation,
  faBolt,
  faList,
  faCircleCheck,
  faUsers,
  faShieldHalved,
  faBoxesStacked,
  faTrendingUp,
  faCircleInfo,
  faArrowUp,
  faArrowDown,
  faMagnifyingGlass,
  faSlidersH,
  faXmark,
  faArrowRight,
  faPlus,
  faMinus,
  faEllipsis,
  faFilter,
  faDownload,
  faUpload,
  faRotateRight,
  faTriangleExclamation,
  faCircleQuestion,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Icon mapping for semantic names
export const icons = {
  // Navigation
  home: faHouse,
  layers: faLayerGroup,
  truck: faTruck,
  spinner: faSpinner,
  'file-text': faFileLines,
  'trending-up': faChartLine,
  'bar-chart': faChartColumn,
  sparkles: faWandMagicSparkles,
  network: faNetworkWired,
  settings: faGear,
  support: faLifeRing,

  // Basic
  lock: faLock,
  'dollar-sign': faDollarSign,
  clock: faClock,
  list: faList,
  users: faUsers,

  // Status
  'circle-exclamation': faCircleExclamation,
  'circle-check': faCircleCheck,
  'circle-info': faCircleInfo,
  'triangle-exclamation': faTriangleExclamation,
  'circle-question': faCircleQuestion,

  // Action
  bolt: faBolt,
  shield: faShieldHalved,
  'boxes-stacked': faBoxesStacked,
  'arrow-up': faArrowUp,
  'arrow-down': faArrowDown,
  search: faMagnifyingGlass,
  sliders: faSlidersH,
  x: faXmark,
  'arrow-right': faArrowRight,
  plus: faPlus,
  minus: faMinus,
  ellipsis: faEllipsis,
  filter: faFilter,
  download: faDownload,
  upload: faUpload,
  refresh: faRotateRight,
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 16, className = '' }: IconProps) {
  const icon = icons[name];

  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
