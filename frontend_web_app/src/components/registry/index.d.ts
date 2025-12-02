export interface RegistryEntry {
  component: any;
  defaultProps?: Record<string, any>;
  previewProps?: Record<string, any>;
}
declare const registry: Record<string, RegistryEntry>;
export default registry;
