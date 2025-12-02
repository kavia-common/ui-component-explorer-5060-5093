//
//
// PUBLIC_INTERFACE
/**
 * Component Registry - Maps component IDs to React components for live preview.
 * This provides a simple, local registry used by the preview utilities to render a component by id.
 *
 * Each entry can export:
 * - component: React component to render in the PreviewCanvas
 * - defaultProps: default props for the component
 * - previewProps: recommended props for preview scenarios (overrides defaultProps)
 */

import PrimaryButton from './samples/PrimaryButton';
import SecondaryButton from './samples/SecondaryButton';
import BasicCard from './samples/BasicCard';
import MediaCard from './samples/MediaCard';
import TopNavigation from './samples/TopNavigation';
import SimpleNavbar from './samples/SimpleNavbar';
import TextInput from './samples/TextInput';
import EmailInput from './samples/EmailInput';
import InfoAlert from './samples/InfoAlert';
import SuccessAlert from './samples/SuccessAlert';
import BasicModal from './samples/BasicModal';
import StatusBadge from './samples/StatusBadge';
import ContactForm from './samples/ContactForm';
import Pagination from './samples/Pagination';
import BreadcrumbSample from './samples/BreadcrumbSample';
import DatePickerBasic from './samples/DatePickerBasic';
import ColorPickerBasic from './samples/ColorPickerBasic';
import GenericPlaceholder from './samples/GenericPlaceholder';

/* New Layout & Content samples */
import Container from './samples/Container.jsx';
import Columns from './samples/Columns.jsx';
import Grid, { GridItem } from './samples/Grid.jsx';
import LayoutSplitter from './samples/LayoutSplitter.jsx';
import Typography from './samples/Typography.jsx';
import Images from './samples/Images.jsx';
import Links from './samples/Links.jsx';
import Dividers from './samples/Dividers.jsx';
import CustomScrollbar from './samples/CustomScrollbar.jsx';

/**
 * PUBLIC_INTERFACE
 * registry - object keyed by component id (matching src/data/components.json "id")
 */
const registry = {
  'btn-primary': {
    component: PrimaryButton,
    defaultProps: { label: 'Primary', onClick: () => {} },
    previewProps: { label: 'Primary' },
  },
  'btn-secondary': {
    component: SecondaryButton,
    defaultProps: { label: 'Secondary', onClick: () => {} },
    previewProps: { label: 'Secondary' },
  },
  'badge-status': {
    component: StatusBadge,
    defaultProps: { text: 'New', color: 'blue' },
    previewProps: { text: 'New', color: 'blue' },
  },
  'alert-info': {
    component: InfoAlert,
    defaultProps: { title: 'Heads up', message: 'This is an informational alert.' },
    previewProps: { title: 'Heads up', message: 'This is an informational alert.' },
  },
  'alert-success': {
    component: SuccessAlert,
    defaultProps: { title: 'All set', message: 'Your changes have been saved.' },
    previewProps: { title: 'All set', message: 'Your changes have been saved.' },
  },
  'card-basic': {
    component: BasicCard,
    defaultProps: { title: 'Card Header', children: 'Card body content...' },
    previewProps: { title: 'Card Header', children: 'Card body content...' },
  },
  'card-media': {
    component: MediaCard,
    defaultProps: {
      title: 'Ocean Sunset',
      description: 'A calming gradient with blue and amber accents.',
      imageUrl: 'https://picsum.photos/seed/ocean/160/100',
    },
    previewProps: undefined,
  },
  'nav-topbar': {
    component: TopNavigation,
    defaultProps: { brand: 'Brand', links: [{ label: 'Docs', href: '#' }, { label: 'Blog', href: '#' }] },
    previewProps: undefined,
  },
  'navbar-simple': {
    component: SimpleNavbar,
    defaultProps: { brand: 'Ocean', links: [{ label: 'Home' }, { label: 'Components' }, { label: 'About' }] },
    previewProps: undefined,
  },
  'input-text': {
    component: TextInput,
    defaultProps: { placeholder: 'Type here' },
    previewProps: { placeholder: 'Type here' },
  },
  'input-email': {
    component: EmailInput,
    defaultProps: { placeholder: 'you@example.com' },
    previewProps: { placeholder: 'you@example.com' },
  },
  'form-contact': {
    component: ContactForm,
    defaultProps: {},
    previewProps: {},
  },
  'modal-basic': {
    component: BasicModal,
    defaultProps: { title: 'Confirm action', open: true },
    previewProps: { title: 'Confirm action', open: true },
  },
  'pagination-basic': {
    component: Pagination,
    defaultProps: { page: 2, totalPages: 5 },
    previewProps: { page: 2, totalPages: 5 },
  },
  'breadcrumb-basic': {
    component: BreadcrumbSample,
    defaultProps: { items: [{ label: 'Home' }, { label: 'Library' }, { label: 'Data' }] },
    previewProps: undefined,
  },
  'datepicker-basic': {
    component: DatePickerBasic,
    defaultProps: { value: '', onChange: () => {} },
    previewProps: { value: '' }
  },
  'color-picker-basic': {
    component: ColorPickerBasic,
    defaultProps: { color: '#2563EB', onChange: () => {} },
    previewProps: { color: '#2563EB' }
  },

  /* Layout & Content (functional) */
  'layout-container': {
    component: Container,
    defaultProps: { size: 'md', children: 'Responsive container area' },
    previewProps: { size: 'lg', children: 'Responsive container area' },
  },
  'layout-columns': {
    component: Columns,
    defaultProps: {
      cols: { base: 1, md: 2, lg: 3 },
      gap: '6',
      children: (
        <>
          <div className="h-16 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-16 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-16 rounded bg-gray-100 dark:bg-gray-800" />
        </>
      )
    },
    previewProps: undefined,
  },
  'layout-grid': {
    component: Grid,
    defaultProps: {
      cols: 12,
      gap: 4,
      children: (
        <>
          <div className="col-span-3 h-16 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="col-span-6 h-16 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="col-span-3 h-16 rounded bg-gray-100 dark:bg-gray-800" />
        </>
      )
    },
    previewProps: undefined,
  },
  'layout-splitter': {
    component: LayoutSplitter,
    defaultProps: {
      left: (
        <div className="space-y-2">
          <div className="h-16 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-16 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
      ),
      right: <div className="h-32 rounded bg-gray-100 dark:bg-gray-800" />,
      initial: 40,
      minLeft: 20,
      minRight: 20,
      height: '320px'
    },
    previewProps: undefined,
  },
  'content-typography': {
    component: Typography,
    defaultProps: {},
    previewProps: {},
  },
  'content-images': {
    component: Images,
    defaultProps: {},
    previewProps: {},
  },
  'content-links': {
    component: Links,
    defaultProps: {},
    previewProps: {},
  },
  'content-dividers': {
    component: Dividers,
    defaultProps: {},
    previewProps: {},
  },
  'content-scrollbar': {
    component: CustomScrollbar,
    defaultProps: {},
    previewProps: {},
  },

  // Keep placeholders for unimplemented items
  'placeholder-container': { component: GenericPlaceholder, previewProps: { title: 'Container', blurb: 'Responsive container widths for wrapping content.' } },
  'placeholder-columns': { component: GenericPlaceholder, previewProps: { title: 'Columns', blurb: 'Simple column layouts and utilities.' } },
  'placeholder-grid': { component: GenericPlaceholder, previewProps: { title: 'Grid', blurb: 'CSS grid presets for common layouts.' } },
  'placeholder-layout-splitter': { component: GenericPlaceholder, previewProps: { title: 'Layout Splitter', blurb: 'Resizable split layout patterns.' } },
  'placeholder-typography': { component: GenericPlaceholder, previewProps: { title: 'Typography', blurb: 'Headings, paragraphs, and text utilities.' } },
  'placeholder-images': { component: GenericPlaceholder, previewProps: { title: 'Images', blurb: 'Image styles and responsive behavior.' } },
  'placeholder-links': { component: GenericPlaceholder, previewProps: { title: 'Links', blurb: 'Anchor styles and link patterns.' } },
  'placeholder-dividers-and-hr': { component: GenericPlaceholder, previewProps: { title: 'Dividers and <hr>', blurb: 'Horizontal rules and section separators.' } },
  'placeholder-kbd': { component: GenericPlaceholder, previewProps: { title: 'KBD', blurb: 'Keyboard hint badges for shortcuts.' } },
  'placeholder-custom-scrollbar': { component: GenericPlaceholder, previewProps: { title: 'Custom Scrollbar', blurb: 'Scrollbar theming examples.' } },

  // Other placeholders unchanged...
  'placeholder-accordion': { component: GenericPlaceholder, previewProps: { title: 'Accordion', blurb: 'Disclosure lists with expand/collapse.' } },
  'placeholder-alerts': { component: GenericPlaceholder, previewProps: { title: 'Alerts', blurb: 'Inline notices for statuses and messages.' } },
  'placeholder-avatar': { component: GenericPlaceholder, previewProps: { title: 'Avatar', blurb: 'User avatars and sizes.' } },
  'placeholder-avatar-group': { component: GenericPlaceholder, previewProps: { title: 'Avatar Group', blurb: 'Overlapping or stacked avatar sets.' } },
  'placeholder-badge': { component: GenericPlaceholder, previewProps: { title: 'Badge', blurb: 'Tiny labels for statuses and tags.' } },
  'placeholder-blockquote': { component: GenericPlaceholder, previewProps: { title: 'Blockquote', blurb: 'Quoted content styles.' } },
  'placeholder-buttons': { component: GenericPlaceholder, previewProps: { title: 'Buttons', blurb: 'Primary, secondary, and more button variants.' } },
  'placeholder-button-group': { component: GenericPlaceholder, previewProps: { title: 'Button Group', blurb: 'Grouped buttons with spacing.' } },
  'placeholder-card': { component: GenericPlaceholder, previewProps: { title: 'Card', blurb: 'Content containers with header and body.' } },
  'placeholder-chat-bubbles': { component: GenericPlaceholder, previewProps: { title: 'Chat Bubbles', blurb: 'Message bubbles for chat UIs.' } },
  'placeholder-carousel': { component: GenericPlaceholder, previewProps: { title: 'Carousel', blurb: 'Sliding content areas.' } },
  'placeholder-collapse': { component: GenericPlaceholder, previewProps: { title: 'Collapse', blurb: 'Hide/show content areas.' } },
  'placeholder-datepicker': { component: GenericPlaceholder, previewProps: { title: 'Datepicker', blurb: 'Pick dates with a calendar UI.' } },
  'placeholder-devices': { component: GenericPlaceholder, previewProps: { title: 'Devices', blurb: 'Device frames for screenshots.' } },
  'placeholder-lists': { component: GenericPlaceholder, previewProps: { title: 'Lists', blurb: 'Styled list patterns.' } },
  'placeholder-list-group': { component: GenericPlaceholder, previewProps: { title: 'List Group', blurb: 'Grouped list items with borders.' } },
  'placeholder-legend-indicator': { component: GenericPlaceholder, previewProps: { title: 'Legend Indicator', blurb: 'Small color indicators for legends.' } },
  'placeholder-progress': { component: GenericPlaceholder, previewProps: { title: 'Progress', blurb: 'Progress bars and loaders.' } },
  'placeholder-file-uploading-progress': { component: GenericPlaceholder, previewProps: { title: 'File Uploading Progress', blurb: 'File upload progress patterns.' } },
  'placeholder-ratings': { component: GenericPlaceholder, previewProps: { title: 'Ratings', blurb: 'Star and score rating components.' } },
  'placeholder-skeleton': { component: GenericPlaceholder, previewProps: { title: 'Skeleton', blurb: 'Loading placeholder elements.' } },
  'placeholder-spinners': { component: GenericPlaceholder, previewProps: { title: 'Spinners', blurb: 'Activity indicators and spinners.' } },
  'placeholder-styled-icons': { component: GenericPlaceholder, previewProps: { title: 'Styled Icons', blurb: 'Iconography with consistent styles.' } },
  'placeholder-toasts': { component: GenericPlaceholder, previewProps: { title: 'Toasts', blurb: 'Transient notifications.' } },
  'placeholder-timeline': { component: GenericPlaceholder, previewProps: { title: 'Timeline', blurb: 'Sequential timeline views.' } },
  'placeholder-tree-view': { component: GenericPlaceholder, previewProps: { title: 'Tree View', blurb: 'Hierarchical expandable lists.' } },

  'placeholder-navbar': { component: GenericPlaceholder, previewProps: { title: 'Navbar', blurb: 'Top navigation bars with brand and links.' } },
  'placeholder-mega-menu': { component: GenericPlaceholder, previewProps: { title: 'Mega Menu', blurb: 'Large menu panels with sections.' } },
  'placeholder-navs': { component: GenericPlaceholder, previewProps: { title: 'Navs', blurb: 'Simple nav lists and pills.' } },
  'placeholder-tabs': { component: GenericPlaceholder, previewProps: { title: 'Tabs', blurb: 'Tabbed navigation sections.' } },
  'placeholder-sidebar-new': { component: GenericPlaceholder, previewProps: { title: 'Sidebar', blurb: 'Updated sidebar variants and states.' } },
  'placeholder-scrollspy': { component: GenericPlaceholder, previewProps: { title: 'Scrollspy', blurb: 'Track active section while scrolling.' } },
  'placeholder-breadcrumb': { component: GenericPlaceholder, previewProps: { title: 'Breadcrumb', blurb: 'Breadcrumb trails for hierarchy.' } },
  'placeholder-pagination': { component: GenericPlaceholder, previewProps: { title: 'Pagination', blurb: 'Page navigation controls.' } },
  'placeholder-stepper': { component: GenericPlaceholder, previewProps: { title: 'Stepper', blurb: 'Multi-step progress navigation.' } },

  'placeholder-input': { component: GenericPlaceholder, previewProps: { title: 'Input', blurb: 'Text input fields.' } },
  'placeholder-input-group': { component: GenericPlaceholder, previewProps: { title: 'Input Group', blurb: 'Inputs with addons and icons.' } },
  'placeholder-textarea': { component: GenericPlaceholder, previewProps: { title: 'Textarea', blurb: 'Multi-line text fields.' } },
  'placeholder-file-input': { component: GenericPlaceholder, previewProps: { title: 'File Input', blurb: 'File chooser controls.' } },
  'placeholder-checkbox': { component: GenericPlaceholder, previewProps: { title: 'Checkbox', blurb: 'Checkbox selections.' } },
  'placeholder-radio': { component: GenericPlaceholder, previewProps: { title: 'Radio', blurb: 'Radio options.' } },
  'placeholder-switch': { component: GenericPlaceholder, previewProps: { title: 'Switch', blurb: 'Toggle switches.' } },
  'placeholder-select': { component: GenericPlaceholder, previewProps: { title: 'Select', blurb: 'Dropdown selections.' } },
  'placeholder-range-slider': { component: GenericPlaceholder, previewProps: { title: 'Range Slider', blurb: 'Range input sliders.' } },
  'placeholder-color-picker': { component: GenericPlaceholder, previewProps: { title: 'Color Picker', blurb: 'Color selection inputs.' } },
  'placeholder-timepicker': { component: GenericPlaceholder, previewProps: { title: 'TimePicker', blurb: 'Time selection controls.' } },

  'placeholder-advanced-select': { component: GenericPlaceholder, previewProps: { title: 'Advanced Select', blurb: 'Searchable, async, and multi selects.' } },
  'placeholder-combobox': { component: GenericPlaceholder, previewProps: { title: 'ComboBox', blurb: 'Typeahead combobox field.' } },
  'placeholder-searchbox': { component: GenericPlaceholder, previewProps: { title: 'SearchBox', blurb: 'Search input with suggestions.' } },
  'placeholder-input-number': { component: GenericPlaceholder, previewProps: { title: 'Input Number', blurb: 'Numeric input with steppers.' } },
  'placeholder-strong-password': { component: GenericPlaceholder, previewProps: { title: 'Strong Password', blurb: 'Password strength helpers.' } },
  'placeholder-toggle-password': { component: GenericPlaceholder, previewProps: { title: 'Toggle Password', blurb: 'Show/hide password input.' } },
  'placeholder-toggle-count': { component: GenericPlaceholder, previewProps: { title: 'Toggle Count', blurb: 'Counter toggles with limits.' } },
  'placeholder-copy-markup': { component: GenericPlaceholder, previewProps: { title: 'Copy Markup', blurb: 'Copy-to-clipboard helpers.' } },
  'placeholder-pin-input': { component: GenericPlaceholder, previewProps: { title: 'PIN Input', blurb: 'PIN entry fields.' } },
  'placeholder-overlays': { component: GenericPlaceholder, previewProps: { title: 'Overlays', blurb: 'Modal, popover, tooltip foundations.' } },
  'placeholder-dropdown': { component: GenericPlaceholder, previewProps: { title: 'Dropdown', blurb: 'Dropdown menus and triggers.' } },
  'placeholder-context-menu': { component: GenericPlaceholder, previewProps: { title: 'Context Menu', blurb: 'Right-click context menus.' } },
  'placeholder-modal': { component: GenericPlaceholder, previewProps: { title: 'Modal', blurb: 'Dialog windows with overlay.' } },
  'placeholder-offcanvas-drawer': { component: GenericPlaceholder, previewProps: { title: 'Offcanvas (Drawer)', blurb: 'Slide-in side panels.' } },
  'placeholder-popover': { component: GenericPlaceholder, previewProps: { title: 'Popover', blurb: 'Small overlay panels.' } },
  'placeholder-tooltip': { component: GenericPlaceholder, previewProps: { title: 'Tooltip', blurb: 'Text hints on hover/focus.' } },

  'placeholder-data-tables': { component: GenericPlaceholder, previewProps: { title: 'Data Tables', blurb: 'Sortable and pageable data grids.' } },
};

export default registry;
export { GridItem };
