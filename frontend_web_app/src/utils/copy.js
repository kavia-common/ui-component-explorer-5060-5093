//
// PUBLIC_INTERFACE
/**
 * copyText - copy arbitrary text to clipboard with a fallback <textarea> approach.
 * Returns true if copy succeeded, false otherwise.
 *
 * Note: navigator.clipboard may require secure contexts; fallback covers most cases.
 */
export async function copyText(text = '') {
  const value = String(text ?? '');
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // ignore and try fallback
  }

  try {
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

/**
 * PUBLIC_INTERFACE
 * copyCodeSnippet - specialized helper that trims and copies code strings.
 */
export async function copyCodeSnippet(code = '') {
  const normalized = typeof code === 'string' ? code : String(code ?? '');
  return copyText(normalized);
}
