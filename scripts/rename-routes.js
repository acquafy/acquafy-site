const fs = require('fs');
const { execSync } = require('child_process');

const map = [
  ['/plataforma', '/platform'],
  ['/central-de-suporte', '/support-center'],
  ['/tecnologia', '/technology'],
  ['/linha-neo', '/neo-line'],
  ['/filtros', '/filters'],
  ['/sobre', '/about'],
  ['/expansao-global', '/global-expansion'],
  ['/contact', '/contact'],
  ['/parceria', '/partnership'],
  ['/politicas-privacidade', '/privacy-policy'],
  ['/termos-de-uso', '/terms-of-use'],
  ['/artigos', '/articles'],
];

const files = execSync('git ls-files "*.tsx"', { encoding: 'utf8' }).trim().split('\n');
let n = 0;
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  let m = c;
  for (const [a, b] of map) m = m.split(a).join(b);
  if (m !== c) {
    fs.writeFileSync(f, m, 'utf8');
    console.log('Updated:', f);
    n++;
  }
}
console.log(n + ' files updated');
