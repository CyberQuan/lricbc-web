import fs from 'fs';
import path from 'path';
import { getGooglePhotosUrls } from './google-photos';

const galleryDirectory = path.join(process.cwd(), 'public/gallery');

export interface GalleryEvent {
  id: string; // folder name
  title_en: string;
  title_zh: string;
  date: string;
  category: string;
  thumbnail: string; // path to one random image
  images: string[];  // paths to all images in folder
  googlePhotosUrl?: string; // Link to external album
}

export async function getGalleryEvents(): Promise<GalleryEvent[]> {
  if (!fs.existsSync(galleryDirectory)) {
    return [];
  }

  const folders = fs.readdirSync(galleryDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const eventPromises = folders.map(async folderName => {
    const folderPath = path.join(galleryDirectory, folderName);
    const files = fs.readdirSync(folderPath);
    
    // Find local images
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const localImages = files.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    ).map(img => `/gallery/${folderName}/${img}`);

    // Metadata fallback logic
    let metadata = {
      title_en: folderName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      title_zh: folderName,
      date: "",
      category: "other",
      googlePhotosUrl: ""
    };

    const metadataPath = path.join(folderPath, 'metadata.json');
    if (fs.existsSync(metadataPath)) {
      try {
        const fileContent = fs.readFileSync(metadataPath, 'utf8');
        const customMetadata = JSON.parse(fileContent);
        metadata = { ...metadata, ...customMetadata };
      } catch (e) {
        console.error(`Error parsing metadata for ${folderName}`, e);
      }
    }

    // Combine local and Google Photos images
    let allImages = [...localImages];
    if (metadata.googlePhotosUrl) {
      const googleImages = await getGooglePhotosUrls(metadata.googlePhotosUrl);
      allImages = [...allImages, ...googleImages];
    }

    // Pick a thumbnail
    let thumbnail = "/logo/cropped-LRICBC_Logo.png";
    if (allImages.length > 0) {
      // Pick a random image from all available images
      const randomIndex = Math.floor(Math.random() * allImages.length);
      thumbnail = allImages[randomIndex];
    }

    return {
      id: folderName,
      ...metadata,
      thumbnail,
      images: allImages
    };
  });

  const events = await Promise.all(eventPromises);

  // Sort by date descending
  return events.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getGalleryEvent(id: string): Promise<GalleryEvent | null> {
  const folderPath = path.join(galleryDirectory, id);
  if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
    return null;
  }

  const files = fs.readdirSync(folderPath);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const localImages = files.filter(file => 
    imageExtensions.includes(path.extname(file).toLowerCase())
  ).map(img => `/gallery/${id}/${img}`);

  let metadata = {
    title_en: id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    title_zh: id,
    date: "",
    category: "other",
    googlePhotosUrl: ""
  };

  const metadataPath = path.join(folderPath, 'metadata.json');
  if (fs.existsSync(metadataPath)) {
    try {
      const fileContent = fs.readFileSync(metadataPath, 'utf8');
      metadata = { ...metadata, ...JSON.parse(fileContent) };
    } catch (e) {}
  }

  // Combine local and Google Photos images
  let allImages = [...localImages];
  if (metadata.googlePhotosUrl) {
    const googleImages = await getGooglePhotosUrls(metadata.googlePhotosUrl);
    allImages = [...allImages, ...googleImages];
  }

  // Pick a thumbnail
  let thumbnail = "/logo/cropped-LRICBC_Logo.png";
  if (allImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * allImages.length);
    thumbnail = allImages[randomIndex];
  }

  return {
    id,
    ...metadata,
    thumbnail,
    images: allImages
  };
}

export async function getRandomGalleryImages(count: number): Promise<string[]> {
  if (!fs.existsSync(galleryDirectory)) return [];

  const events = await getGalleryEvents();
  let allImages: string[] = [];
  
  events.forEach(event => {
    allImages = allImages.concat(event.images);
  });

  // Shuffle and pick count
  return allImages
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}


