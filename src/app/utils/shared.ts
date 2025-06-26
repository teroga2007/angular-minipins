export function reloadPage(): void {
  window.location.reload();
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
