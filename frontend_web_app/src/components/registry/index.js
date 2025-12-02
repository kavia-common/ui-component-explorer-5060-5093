//
//
// PUBLIC_INTERFACE
/**
 * Component Registry - Maps component IDs to React components for live preview.
 * This provides a simple, local registry used by the preview utilities to render a component by id.
 *
 * Each entry exports:
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
import Input from './samples/Input.jsx';
import InputGroup from './samples/InputGroup.jsx';
import Textarea from './samples/Textarea.jsx';
import FileInput from './samples/FileInput.jsx';
import Checkbox from './samples/Checkbox.jsx';
import Radio from './samples/Radio.jsx';
import Switch from './samples/Switch.jsx';
import Select from './samples/Select.jsx';
import RangeSlider from './samples/RangeSlider.jsx';
import ColorPickerTailwind from './samples/ColorPickerTailwind.jsx';
import TimePicker from './samples/TimePicker.jsx';

/* Layout & Content samples */
import Container from './samples/Container.jsx';
import Columns from './samples/Columns.jsx';
import Grid, { GridItem } from './samples/Grid.jsx';
import LayoutSplitter from './samples/LayoutSplitter.jsx';
import Typography from './samples/Typography.jsx';
import Images from './samples/Images.jsx';
import Links from './samples/Links.jsx';
import Dividers from './samples/Dividers.jsx';
import CustomScrollbar from './samples/CustomScrollbar.jsx';
import KbdSample from './samples/Kbd.jsx';
import Accordion from './samples/Accordion.jsx';
import BaseAlert from './samples/Alerts.jsx';
import Avatar, { AvatarGroup } from './samples/Avatar.jsx';
import Blockquote from './samples/Blockquote.jsx';
import ButtonGroup from './samples/ButtonGroup.jsx';
import ChatBubbles from './samples/ChatBubbles.jsx';
import Carousel from './samples/Carousel.jsx';
import Collapse from './samples/Collapse.jsx';
import DevicesMockup from './samples/Devices.jsx';
import { Lists as ListsSample, ListGroup as ListGroupSample } from './samples/Lists.jsx';
import { LegendIndicator, Progress as ProgressSample } from './samples/LegendProgress.jsx';
import UploadProgress from './samples/UploadProgress.jsx';
import Ratings from './samples/Ratings.jsx';
import Skeleton from './samples/Skeleton.jsx';
import Spinners from './samples/Spinners.jsx';
import StyledIcons from './samples/StyledIcons.jsx';
import Toasts from './samples/Toasts.jsx';
import Timeline from './samples/Timeline.jsx';
import TreeView from './samples/TreeView.jsx';

/* New Navigation samples */
import Navbar from './samples/Navbar.jsx';
import MegaMenu from './samples/MegaMenu.jsx';
import Navs from './samples/Navs.jsx';
import Tabs from './samples/Tabs.jsx';
import SidebarSample from './samples/SidebarSample.jsx';
import Scrollspy from './samples/Scrollspy.jsx';
import BreadcrumbNav from './samples/BreadcrumbNav.jsx';
import PaginationNav from './samples/PaginationNav.jsx';
import Stepper from './samples/Stepper.jsx';

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

  /* Basic Forms */
  'form-input': {
    component: Input,
    defaultProps: { label: 'Label', placeholder: 'Type here', helper: 'Helper text' },
    previewProps: { label: 'Label', placeholder: 'Type here' }
  },
  'form-input-group': {
    component: InputGroup,
    defaultProps: { label: 'Website', addon: 'https://', placeholder: 'example.com', button: 'Go' },
    previewProps: { label: 'Website' }
  },
  'form-textarea': {
    component: Textarea,
    defaultProps: { label: 'Message', rows: 4, placeholder: 'Write your message...' },
    previewProps: { label: 'Message' }
  },
  'form-file': {
    component: FileInput,
    defaultProps: {},
    previewProps: {}
  },
  'form-checkbox': {
    component: Checkbox,
    defaultProps: { label: 'Subscribe to newsletter', defaultChecked: true },
    previewProps: { label: 'Subscribe to newsletter' }
  },
  'form-radio': {
    component: Radio,
    defaultProps: { options: ['Monthly', 'Yearly'] },
    previewProps: { options: ['Monthly', 'Yearly'] }
  },
  'form-switch': {
    component: Switch,
    defaultProps: { label: 'Enable notifications', defaultOn: true },
    previewProps: { label: 'Enable notifications' }
  },
  'form-select': {
    component: Select,
    defaultProps: { label: 'Country', options: ['United States','Canada','United Kingdom'] },
    previewProps: { label: 'Country' }
  },
  'form-range': {
    component: RangeSlider,
    defaultProps: { min: 0, max: 100, step: 1, defaultValue: 40 },
    previewProps: { defaultValue: 40 }
  },
  'form-color-tailwind': {
    component: ColorPickerTailwind,
    defaultProps: { defaultValue: '#2563EB' },
    previewProps: { defaultValue: '#2563EB' }
  },
  'form-time': {
    component: TimePicker,
    defaultProps: { label: 'Select time', defaultValue: '09:30' },
    previewProps: { label: 'Select time' }
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
  'content-kbd': {
    component: KbdSample,
    defaultProps: {},
    previewProps: {},
  },
  'content-scrollbar': {
    component: CustomScrollbar,
    defaultProps: {},
    previewProps: {},
  },

  // Existing base components and placeholders...
  'base-accordion': {
    component: Accordion,
    defaultProps: {
      items: [
        { title: 'What is Ocean theme?', content: 'A clean modern palette with blue and amber accents.' },
        { title: 'Is it accessible?', content: 'Yes — keyboard focus, roles, and labels.' }
      ]
    },
    previewProps: undefined
  },
  'placeholder-alerts': { component: GenericPlaceholder, previewProps: { title: 'Alerts', blurb: 'Inline notices for statuses and messages.' } },
  'base-avatar': {
    component: Avatar,
    defaultProps: { name: 'Leslie Alexander', src: 'https://i.pravatar.cc/96?img=5', size: 'md' },
    previewProps: undefined
  },
  'base-avatar-group': {
    component: AvatarGroup,
    defaultProps: {
      users: [
        { name: 'Leslie', src: 'https://i.pravatar.cc/96?img=5' },
        { name: 'Courtney', src: 'https://i.pravatar.cc/96?img=6' },
        { name: 'Devon', src: 'https://i.pravatar.cc/96?img=7' },
        { name: 'Alex', src: 'https://i.pravatar.cc/96?img=8' }
      ],
      max: 3
    },
    previewProps: undefined
  },
  'base-badge': {
    component: ({ text = 'Beta' }) => (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        {text}
      </span>
    ),
    defaultProps: { text: 'Beta' },
    previewProps: undefined
  },
  'base-blockquote': {
    component: Blockquote,
    defaultProps: { children: '“Simplicity is the soul of efficiency.”', cite: 'Austin Freeman' },
    previewProps: undefined
  },
  'placeholder-buttons': { component: GenericPlaceholder, previewProps: { title: 'Buttons', blurb: 'Primary, secondary, and more button variants.' } },
  'base-button-group': {
    component: ButtonGroup,
    defaultProps: { options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }], value: 'left' },
    previewProps: undefined
  },
  'placeholder-card': { component: GenericPlaceholder, previewProps: { title: 'Card', blurb: 'Content containers with header and body.' } },
  'base-chat-bubbles': {
    component: ChatBubbles,
    defaultProps: { messages: [{ me: false, text: 'Hello!' }, { me: true, text: 'Hi there 👋' }] },
    previewProps: undefined
  },
  'base-carousel': {
    component: Carousel,
    defaultProps: {},
    previewProps: {}
  },
  'base-collapse': {
    component: Collapse,
    defaultProps: { title: 'Advanced options', children: 'Hidden content...' },
    previewProps: undefined
  },
  'placeholder-datepicker': { component: GenericPlaceholder, previewProps: { title: 'Datepicker', blurb: 'Pick dates with a calendar UI.' } },
  'base-devices': {
    component: DevicesMockup,
    defaultProps: {},
    previewProps: {}
  },
  'base-lists': { component: ListsSample, defaultProps: {}, previewProps: {} },
  'base-list-group': { component: ListGroupSample, defaultProps: { items: [{ title: 'Profile' }, { title: 'Billing' }, { title: 'Team' }] }, previewProps: undefined },
  'base-legend-indicator': { component: LegendIndicator, defaultProps: { color: 'blue', label: 'Active' }, previewProps: undefined },
  'base-progress': { component: ProgressSample, defaultProps: { value: 65 }, previewProps: undefined },
  'base-upload-progress': { component: UploadProgress, defaultProps: { filename: 'ocean.png', percent: 42 }, previewProps: undefined },
  'base-ratings': { component: Ratings, defaultProps: { value: 3.5 }, previewProps: undefined },
  'base-skeleton': { component: Skeleton, defaultProps: { lines: 3 }, previewProps: undefined },
  'base-spinners': { component: Spinners, defaultProps: {}, previewProps: {} },
  'base-styled-icons': { component: StyledIcons, defaultProps: {}, previewProps: {} },
  'base-toasts': { component: Toasts, defaultProps: {}, previewProps: {} },
  'base-timeline': { component: Timeline, defaultProps: { items: [{ title: 'Kickoff', date: 'Jan 10' }, { title: 'Design', date: 'Jan 18' }, { title: 'Build', date: 'Feb 02' }] }, previewProps: undefined },
  'base-tree-view': { component: TreeView, defaultProps: { data: [{ label: 'src', children: [{ label: 'components' }, { label: 'pages' }] }, { label: 'public', children: [{ label: 'assets' }] }] }, previewProps: undefined },

  /* Navigation samples (new mappings) */
  'navbar': {
    component: Navbar,
    defaultProps: { brand: 'Brand', links: ['Features', 'Pricing', 'About'] },
    previewProps: { brand: 'Brand', links: ['Features', 'Pricing', 'About'] }
  },
  'mega-menu': {
    component: MegaMenu,
    defaultProps: {},
    previewProps: {}
  },
  'navs': {
    component: Navs,
    defaultProps: {},
    previewProps: {}
  },
  'tabs': {
    component: Tabs,
    defaultProps: { tabs: ['Profile', 'Billing', 'Notifications'] },
    previewProps: { tabs: ['Profile', 'Billing', 'Notifications'] }
  },
  'sidebar-sample': {
    component: SidebarSample,
    defaultProps: {},
    previewProps: {}
  },
  'scrollspy': {
    component: Scrollspy,
    defaultProps: {},
    previewProps: {}
  },
  'breadcrumb': {
    component: BreadcrumbNav,
    defaultProps: { items: ['Home', 'Library', 'Data'] },
    previewProps: { items: ['Home', 'Library', 'Data'] }
  },
  'pagination': {
    component: PaginationNav,
    defaultProps: { total: 7, current: 2 },
    previewProps: { total: 7, current: 2 }
  },
  'stepper': {
    component: Stepper,
    defaultProps: { steps: ['Account','Profile','Confirm'], current: 1 },
    previewProps: { steps: ['Account','Profile','Confirm'], current: 1 }
  },

  /* Placeholders maintained for roadmap (kept for compatibility) */
  'placeholder-navbar': { component: GenericPlaceholder, previewProps: { title: 'Navbar', blurb: 'Top navigation bars with brand and links.' } },
  'placeholder-mega-menu': { component: GenericPlaceholder, previewProps: { title: 'Mega Menu', blurb: 'Large menu panels with sections.' } },
  'placeholder-navs': { component: GenericPlaceholder, previewProps: { title: 'Navs', blurb: 'Simple nav lists and pills.' } },
  'placeholder-tabs': { component: GenericPlaceholder, previewProps: { title: 'Tabs', blurb: 'Tabbed navigation sections.' } },
  'placeholder-sidebar-new': { component: GenericPlaceholder, previewProps: { title: 'Sidebar', blurb: 'Updated sidebar variants and states.' } },
  'placeholder-scrollspy': { component: GenericPlaceholder, previewProps: { title: 'Scrollspy', blurb: 'Track active section while scrolling.' } },
  'placeholder-breadcrumb': { component: GenericPlaceholder, previewProps: { title: 'Breadcrumb', blurb: 'Breadcrumb trails for hierarchy.' } },
  'placeholder-pagination': { component: GenericPlaceholder, previewProps: { title: 'Pagination', blurb: 'Page navigation controls.' } },
  'placeholder-stepper': { component: GenericPlaceholder, previewProps: { title: 'Stepper', blurb: 'Multi-step progress navigation.' } },

  // Forms, advanced, data tables placeholders unchanged...
};

export default registry;
export { GridItem };
