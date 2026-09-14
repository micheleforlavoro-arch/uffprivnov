const fs = require('fs');
['src/app/admin/page.tsx', 'src/components/admin/ProductForm.tsx', 'src/components/product/ProductCard.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\\\/g, '\');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(file, content, 'utf8');
});
