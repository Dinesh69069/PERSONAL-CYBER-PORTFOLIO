// This script prepares your portfolio for GitHub Pages deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a special 404.html file that redirects to index.html for SPA support
const notFoundHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting to index.html</title>
    <script>
      // Single Page App routing fix for GitHub Pages
      // Redirects all 404s to index.html to handle SPA routing
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
  <body>
    Redirecting to the main page...
  </body>
</html>
`;

// Add a script to handle redirects to the index.html
const redirectScript = `
<script>
  // Handle SPA routing on GitHub Pages
  (function() {
    // Check for redirect from 404.html
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
`;

// Function to create deployment files
async function createDeploymentFiles() {
  console.log('Creating necessary files for GitHub Pages deployment...');
  
  // 1. Create dist/public directory if it doesn't exist
  const publicDir = path.join(__dirname, 'dist', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // 2. Create 404.html file
  fs.writeFileSync(path.join(publicDir, '404.html'), notFoundHtml);
  console.log('Created 404.html for SPA routing support');
  
  // 3. Create or update CNAME file if needed
  // const cnameContent = 'yourdomain.com'; 
  // fs.writeFileSync(path.join(publicDir, 'CNAME'), cnameContent);
  // console.log('Created CNAME file for custom domain');
  
  console.log('Deployment files created successfully!');
}

createDeploymentFiles().catch(console.error);