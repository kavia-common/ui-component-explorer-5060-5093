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
};

export default registry;
