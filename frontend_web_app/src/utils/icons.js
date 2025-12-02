//
// PUBLIC_INTERFACE
/**
 * getIconComponent - map icon keys to SVG React components.
 * Usage:
 *   import { getIconComponent } from '../utils/icons';
 *   const Icon = getIconComponent('container'); // returns a React component
 *   <Icon className="h-4 w-4" aria-hidden="true" />
 *
 * Notes:
 * - All icons are outline style, aligned with Ocean Professional theme.
 * - Decorative usage should set aria-hidden="true".
 * - If an unknown icon key is passed, it falls back to 'default'.
 */
import React from 'react';

// Base Icon component factory
function createIcon(pathElements = null) {
  return function Icon({ className = 'h-4 w-4', strokeWidth = 2, ...rest }) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...rest}
      >
        {pathElements}
      </svg>
    );
  };
}

// Generic/default icon (a simple square dashboard)
const DefaultIcon = createIcon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </>
);

// Common icons used in sidebar
const ContainerIcon = createIcon(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 9h18" />
  </>
);

const ColumnsIcon = createIcon(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M12 4v16" />
  </>
);

const GridIcon = createIcon(
  <>
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="8" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <rect x="13" y="13" width="8" height="8" rx="1" />
  </>
);

const SplitIcon = createIcon(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M12 4v16" />
    <path d="M9 12h6" />
  </>
);

const TypographyIcon = createIcon(
  <>
    <path d="M4 20h16" />
    <path d="M6 20l6-16 6 16" />
    <path d="M8 16h8" />
  </>
);

const ImageIcon = createIcon(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8" cy="10" r="2" />
    <path d="M21 19l-6-6-4 4-3-3-5 5" />
  </>
);

const LinkIcon = createIcon(
  <>
    <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
    <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
  </>
);

const DividerIcon = createIcon(<path d="M4 12h16" />);

const KbdIcon = createIcon(
  <>
    <rect x="3" y="7" width="18" height="10" rx="2" />
    <rect x="6" y="10" width="3" height="4" rx="1" />
    <rect x="11" y="10" width="3" height="4" rx="1" />
    <rect x="16" y="10" width="3" height="4" rx="1" />
  </>
);

const ScrollbarIcon = createIcon(
  <>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <rect x="15" y="6" width="2" height="12" rx="1" />
  </>
);

const AccordionIcon = createIcon(<path d="M6 9l6 6 6-6" />);

const AlertIcon = createIcon(
  <>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </>
);

const AvatarIcon = createIcon(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20a6 6 0 0 1 12 0" />
  </>
);

const BadgeIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="7" />
    <path d="M8 12h8" />
  </>
);

const CardIcon = createIcon(
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M3 10h18" />
  </>
);

const ChatIcon = createIcon(
  <>
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
  </>
);

const CarouselIcon = createIcon(
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M7 6v12M17 6v12" />
  </>
);

const CollapseIcon = createIcon(
  <>
    <path d="M8 10l4-4 4 4" />
    <path d="M16 14l-4 4-4-4" />
  </>
);

const DateIcon = createIcon(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 11h18" />
  </>
);

const DevicesIcon = createIcon(
  <>
    <rect x="2" y="7" width="14" height="10" rx="2" />
    <path d="M22 11v7a2 2 0 0 1-2 2h-8" />
  </>
);

const ListIcon = createIcon(
  <>
    <path d="M8 6h13M8 12h13M8 18h13" />
    <circle cx="4" cy="6" r="1" />
    <circle cx="4" cy="12" r="1" />
    <circle cx="4" cy="18" r="1" />
  </>
);

const ProgressIcon = createIcon(
  <>
    <rect x="3" y="10" width="18" height="4" rx="2" />
    <rect x="3" y="10" width="9" height="4" rx="2" />
  </>
);

const SpinnerIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" opacity="0.25" />
    <path d="M21 12a9 9 0 0 0-9-9" />
  </>
);

const ToastIcon = createIcon(
  <>
    <rect x="3" y="7" width="18" height="10" rx="2" />
    <path d="M7 12h10" />
  </>
);

const TimelineIcon = createIcon(
  <>
    <path d="M4 6v12" />
    <circle cx="4" cy="8" r="2" />
    <circle cx="4" cy="16" r="2" />
    <path d="M8 8h12M8 16h12" />
  </>
);

const TreeIcon = createIcon(
  <>
    <path d="M12 2v4M12 22v-4" />
    <path d="M7 10h10" />
    <path d="M5 18h14" />
    <circle cx="12" cy="8" r="2" />
    <circle cx="7" cy="16" r="2" />
    <circle cx="17" cy="16" r="2" />
  </>
);

const NavbarIcon = createIcon(
  <>
    <rect x="3" y="5" width="18" height="4" rx="1" />
    <rect x="3" y="11" width="10" height="8" rx="1" />
  </>
);

const MegaMenuIcon = createIcon(
  <>
    <rect x="3" y="5" width="18" height="4" rx="1" />
    <rect x="3" y="11" width="18" height="8" rx="1" />
    <path d="M7 11v8M12 11v8M17 11v8" />
  </>
);

const NavsIcon = createIcon(
  <>
    <rect x="3" y="6" width="6" height="12" rx="1" />
    <rect x="11" y="6" width="10" height="12" rx="1" />
  </>
);

const TabsIcon = createIcon(
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M3 10h18" />
  </>
);

const SidebarIcon = createIcon(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M9 5v14" />
  </>
);

const ScrollspyIcon = createIcon(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 8h10" />
    <path d="M7 12h6" />
    <path d="M7 16h8" />
  </>
);

const BreadcrumbIcon = createIcon(
  <>
    <path d="M4 12h6" />
    <path d="M10 12l4-4" />
    <path d="M10 12l4 4" />
    <path d="M14 12h6" />
  </>
);

const PaginationIcon = createIcon(
  <>
    <path d="M7 12h10" />
    <path d="M5 12l-2-2 2-2" />
    <path d="M19 12l2-2-2-2" />
  </>
);

const StepperIcon = createIcon(
  <>
    <circle cx="6" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
    <path d="M8 12h2M14 12h2" />
  </>
);

const InputIcon = createIcon(
  <>
    <rect x="3" y="9" width="18" height="6" rx="2" />
    <path d="M7 12h10" />
  </>
);

const SelectIcon = createIcon(
  <>
    <rect x="3" y="9" width="18" height="6" rx="2" />
    <path d="M10 12l2 2 2-2" />
  </>
);

const RangeIcon = createIcon(
  <>
    <path d="M4 12h16" />
    <circle cx="12" cy="12" r="2" />
  </>
);

const ColorIcon = createIcon(
  <>
    <path d="M12 3a9 9 0 1 0 9 9" />
    <path d="M12 3v9h9" />
  </>
);

const TimeIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l4 2" />
  </>
);

const ModalIcon = createIcon(
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <rect x="7" y="9" width="10" height="6" rx="1" />
  </>
);

const DropdownIcon = createIcon(
  <>
    <rect x="6" y="5" width="12" height="4" rx="1" />
    <path d="M8 9l4 4 4-4" />
    <rect x="6" y="15" width="12" height="4" rx="1" />
  </>
);

const ContextMenuIcon = createIcon(
  <>
    <rect x="6" y="5" width="12" height="14" rx="2" />
    <path d="M9 9h6M9 13h6" />
  </>
);

const DrawerIcon = createIcon(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
  </>
);

const PopoverIcon = createIcon(
  <>
    <rect x="6" y="6" width="12" height="8" rx="2" />
    <path d="M12 14l-2 4 2-1 2 1-2-4z" />
  </>
);

const TooltipIcon = createIcon(
  <>
    <rect x="6" y="6" width="12" height="6" rx="2" />
    <path d="M12 12v4" />
  </>
);

const TableIcon = createIcon(
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M3 10h18M9 6v12M15 6v12" />
  </>
);

// Registry map
const registry = {
  default: DefaultIcon,
  // Layout & Content
  container: ContainerIcon,
  columns: ColumnsIcon,
  grid: GridIcon,
  'layout-splitter': SplitIcon,
  typography: TypographyIcon,
  images: ImageIcon,
  links: LinkIcon,
  divider: DividerIcon,
  'dividers-and-hr': DividerIcon,
  kbd: KbdIcon,
  'custom-scrollbar': ScrollbarIcon,

  // Base Components
  accordion: AccordionIcon,
  alerts: AlertIcon,
  avatar: AvatarIcon,
  'avatar-group': AvatarIcon,
  badge: BadgeIcon,
  blockquote: TypographyIcon,
  buttons: BadgeIcon,
  'button-group': BadgeIcon,
  card: CardIcon,
  'chat-bubbles': ChatIcon,
  carousel: CarouselIcon,
  collapse: CollapseIcon,
  datepicker: DateIcon,
  devices: DevicesIcon,
  lists: ListIcon,
  'list-group': ListIcon,
  'legend-indicator': BadgeIcon,
  progress: ProgressIcon,
  'file-uploading-progress': ProgressIcon,
  ratings: StarIcon, // will define StarIcon below
  skeleton: GridIcon,
  spinners: SpinnerIcon,
  'styled-icons': BadgeIcon,
  toasts: ToastIcon,
  timeline: TimelineIcon,
  'tree-view': TreeIcon,

  // Navigations
  navbar: NavbarIcon,
  'mega-menu': MegaMenuIcon,
  navs: NavsIcon,
  tabs: TabsIcon,
  'sidebar-new': SidebarIcon,
  scrollspy: ScrollspyIcon,
  breadcrumb: BreadcrumbIcon,
  pagination: PaginationIcon,
  stepper: StepperIcon,

  // Basic Forms
  input: InputIcon,
  'input-group': InputIcon,
  textarea: InputIcon,
  'file-input': InputIcon,
  checkbox: SquareCheckIcon, // define below
  radio: CircleDotIcon, // define below
  switch: ToggleIcon, // define below
  select: SelectIcon,
  'range-slider': RangeIcon,
  'color-picker': ColorIcon,
  timepicker: TimeIcon,

  // Advanced Forms
  'advanced-select': SelectIcon,
  combobox: SelectIcon,
  searchbox: InputIcon,
  'input-number': InputIcon,
  'strong-password': LockIcon, // define below
  'toggle-password': EyeIcon, // define below
  'toggle-count': InputIcon,
  'copy-markup': CopyIcon, // define below
  'pin-input': InputIcon,
  overlays: ModalIcon,
  dropdown: DropdownIcon,
  'context-menu': ContextMenuIcon,
  modal: ModalIcon,
  'offcanvas-drawer': DrawerIcon,
  popover: PopoverIcon,
  tooltip: TooltipIcon,

  // Tables
  'data-tables': TableIcon,
};

// Additional small icons
const StarIcon = createIcon(<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />);
const SquareCheckIcon = createIcon(
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 12l2 2 4-4" />
  </>
);
const CircleDotIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
  </>
);
const ToggleIcon = createIcon(
  <>
    <rect x="3" y="8" width="18" height="8" rx="4" />
    <circle cx="11" cy="12" r="3" />
  </>
);
const LockIcon = createIcon(
  <>
    <rect x="5" y="11" width="14" height="8" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </>
);
const EyeIcon = createIcon(
  <>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </>
);
const CopyIcon = createIcon(
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <rect x="4" y="4" width="11" height="11" rx="2" />
  </>
);

// PUBLIC_INTERFACE
export function getIconComponent(key) {
  /** Return a React component for the given icon key, or DefaultIcon if missing/unknown. */
  if (!key || typeof key !== 'string') return registry.default;
  return registry[key] || registry.default;
}
