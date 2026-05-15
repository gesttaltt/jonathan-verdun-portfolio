/**
 * @file ThemeScript.tsx
 * Inline script to prevent FOUT (Flash of Un-themed Content).
 */
export function ThemeScript() {
  const code = `
    (function() {
      try {
        const savedTheme = localStorage.getItem('theme');
        const supportLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (savedTheme === 'light' || (!savedTheme && supportLight)) {
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
        }
      } catch (e) {}
    })();
  `
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}
