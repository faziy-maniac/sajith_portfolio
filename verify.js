const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/style.css', 'utf8');
const js = fs.readFileSync('js/main.js', 'utf8');

const requiredIds = [
  'pitch-progress-bar',
  'nav-toggle',
  'nav-menu',
  'hero',
  'player-card',
  'about',
  'career',
  'gallery',
  'skills',
  'off-pitch',
  'contact',
  'lightbox-modal',
  'lightbox-img',
  'lightbox-caption',
  'lightbox-counter',
  'lightbox-close',
  'lightbox-prev',
  'lightbox-next',
  'quick-copy-email',
  'toast-msg',
  'current-year'
];

const missingIds = requiredIds.filter(id => !html.includes(`id="${id}"`));
console.log('Missing IDs:', missingIds.length === 0 ? 'None (All 21 IDs present!)' : missingIds);

const images = [
  'assets/images/profile.jpg',
  'assets/images/action-1.jpg',
  'assets/images/action-2.jpg',
  'assets/images/action-3.jpg'
];

images.forEach(img => {
  const exists = fs.existsSync(img);
  const size = exists ? fs.statSync(img).size : 0;
  console.log(`Image [${img}]: ${exists ? `EXISTS (${(size/1024).toFixed(1)} KB)` : 'MISSING'}`);
});

try {
  new Function(js);
  console.log('JavaScript Syntax: VALID');
} catch (e) {
  console.error('JavaScript Syntax ERROR:', e.message);
}

// Check for Instagram references (strictly forbidden)
const hasInstagram = html.toLowerCase().includes('instagram') || css.toLowerCase().includes('instagram') || js.toLowerCase().includes('instagram');
console.log('Contains Instagram reference:', hasInstagram ? 'YES (WARNING)' : 'NO (Compliant)');

// Check mailto and LinkedIn links
console.log('Contains mailto:mdsajith19@gmail.com:', html.includes('mailto:mdsajith19@gmail.com?subject=Hello%20Sajith!'));
console.log('Contains LinkedIn link:', html.includes('https://www.linkedin.com/in/mohamed-sajith-g-053a5437b'));
