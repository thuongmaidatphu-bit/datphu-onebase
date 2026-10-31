const fs = require('fs');
const html = fs.readFileSync('e:\\datphu-onebase\\index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('id="sectionDispatch"') || l.includes('id="sectionFavorites"')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
