export interface PageContent {
  id: number;
  type: 'cover' | 'intro' | 'article' | 'quote' | 'image' | 'back';
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  align?: 'left' | 'right' | 'center';
}

export interface MagazinePageProps {
  pageIndex: number; // The visual index (0, 1, 2...)
  frontContent: PageContent;
  backContent: PageContent;
  flipped: boolean;
  zIndex: number;
  onFlip: () => void;
}

export interface Dimensions {
  width: number;
  height: number;
}