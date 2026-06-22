const fs = require('fs');

const cssPath = 'c:\\Users\\kavin\\OneDrive\\Desktop\\portfolio\\src\\components\\SkillsPageRadar.css';
let css = fs.readFileSync(cssPath, 'utf8');

// We want to replace Xrem with calc(X * var(--r))
css = css.replace(/([\d.]+)rem/g, (match, p1) => {
  if (p1 === '0') return '0';
  return `calc(${p1} * var(--r))`;
});

// We want to replace Xpx with calc(X / 16 * var(--r))
// Skip 1px, 2px borders/shadows as they might be too thin to scale, or maybe scale them too?
// "Build true responsive sizing." -> Everything should scale.
// But 1px borders scaled to 0.2 will vanish! We should keep 1px and 2px borders as px, or use max(1px, calc(...))
css = css.replace(/([\d.]+)px/g, (match, p1) => {
  const val = parseFloat(p1);
  if (val === 0) return '0';
  if (val <= 2) return `${val}px`; // keep thin borders/shadows as px so they don't disappear
  return `calc(${val / 16} * var(--r))`;
});

// Fix any media queries that got replaced (e.g. max-width: calc(1200 / 16 * var(--r)))
// Actually, it's safer to revert media queries to px
css = css.replace(/@media \(max-width: calc\(([\d.]+) \/ 16 \* var\(--r\)\)\)/g, (match, p1) => {
  return `@media (max-width: ${p1}px)`;
});

// We also need to fix the responsive collapse to not apply to .is-miniature
css = css.replace(/\.skills-radar-composition \{/g, (match, offset) => {
  // if it's inside media query (roughly check if previous lines have @media)
  const prevStr = css.substring(Math.max(0, offset - 100), offset);
  if (prevStr.includes('@media')) {
    return '.skills-radar-composition:not(.is-miniature) {';
  }
  return match;
});

fs.writeFileSync(cssPath, css);
console.log('CSS converted successfully.');
