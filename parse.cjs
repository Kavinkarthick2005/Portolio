const fs = require('fs');
const lines = fs.readFileSync('all_sw_css.txt', 'utf16le').split('\n').filter(l => l.trim().length > 0);
lines.forEach((line, i) => {
  try {
    const json = JSON.parse(line);
    const tc = json.tool_calls.find(c => c.name === 'write_to_file');
    if (tc && tc.args.TargetFile.includes('SelectedWork.css')) {
      fs.writeFileSync(`sw_css_version_${i}.css`, tc.args.CodeContent);
      console.log(`Wrote sw_css_version_${i}.css`);
    }
  } catch (e) {
    console.log('Error parsing line', i);
  }
});
