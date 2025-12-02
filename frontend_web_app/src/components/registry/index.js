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
import BasicCard from './samples/BasicCard';
import TopNavigation from './samples/TopNavigation';
import TextInput from './samples/TextInput';

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
  'card-basic': {
    component: BasicCard,
    defaultProps: { title: 'Card Header', children: 'Card body content...' },
    previewProps: { title: 'Card Header', children: 'Card body content...' },
  },
  'nav-topbar': {
    component: TopNavigation,
    defaultProps: { brand: 'Brand', links: [{ label: 'Docs', href: '#' }, { label: 'Blog', href: '#' }] },
    previewProps: undefined,
  },
  'input-text': {
    component: TextInput,
    defaultProps: { placeholder: 'Type here' },
    previewProps: { placeholder: 'Type here' },
  },
};

export default registry;
