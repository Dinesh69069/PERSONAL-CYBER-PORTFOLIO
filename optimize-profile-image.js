import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, 'client', 'public');
const inputImage = join(publicDir, 'profile-new.jpg');
const outputJpg = join(publicDir, 'cyber-profile-rect.jpg');
const outputWebp = join(publicDir, 'cyber-profile-rect.webp');

async function optimizeImage() {
  try {
    console.log('🖼️  Optimizing profile image...');
    
    // Check if input exists
    if (!fs.existsSync(inputImage)) {
      console.error('❌ Error: profile-new.jpg not found in client/public/');
      console.log('📝 Please save the uploaded image as profile-new.jpg in client/public/ folder');
      process.exit(1);
    }

    // Create high-quality JPG version
    await sharp(inputImage)
      .resize(800, 800, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90 })
      .toFile(outputJpg);
    
    console.log('✅ Created: cyber-profile-rect.jpg');

    // Create WebP version (smaller file size, better quality)
    await sharp(inputImage)
      .resize(800, 800, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 85 })
      .toFile(outputWebp);
    
    console.log('✅ Created: cyber-profile-rect.webp');

    // Get file sizes
    const jpgSize = (fs.statSync(outputJpg).size / 1024).toFixed(2);
    const webpSize = (fs.statSync(outputWebp).size / 1024).toFixed(2);
    
    console.log(`\n📊 File Sizes:`);
    console.log(`   JPG:  ${jpgSize} KB`);
    console.log(`   WebP: ${webpSize} KB`);
    console.log(`   Saved: ${(jpgSize - webpSize).toFixed(2)} KB with WebP`);
    
    // Clean up source file
    fs.unlinkSync(inputImage);
    console.log('\n🧹 Cleaned up source file');
    console.log('✅ Profile image optimization complete!');
    
  } catch (error) {
    console.error('❌ Error optimizing image:', error.message);
    process.exit(1);
  }
}

optimizeImage();
