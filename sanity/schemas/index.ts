// Document types
import { siteSettings } from './siteSettings';
import { navigation } from './navigation';
import { homePage } from './homePage';
import { aboutPage } from './aboutPage';
import { contactPage } from './contactPage';
import { quotePage } from './quotePage';
import { deliveryPage } from './deliveryPage';
import { speciesPage } from './speciesPage';
import { productPage } from './productPage';
import { industry } from './industry';
import { faqItem } from './faqItem';
import { article } from './article';

// Object types
import { imageWithAlt } from './objects/imageWithAlt';
import { ctaBlock } from './objects/ctaBlock';
import { seoFields } from './objects/seoFields';
import { specRow } from './objects/specRow';
import { gradeStocked } from './objects/gradeStocked';
import { thicknessSpec } from './objects/thicknessSpec';
import { relatedSpeciesRef } from './objects/relatedSpeciesRef';
import { sectionBlock } from './objects/sectionBlock';
import { productTile } from './objects/productTile';
import { industryRef } from './objects/industryRef';
import { blockContent } from './objects/blockContent';

export const schemaTypes = [
  // Document types
  siteSettings,
  navigation,
  homePage,
  aboutPage,
  contactPage,
  quotePage,
  deliveryPage,
  speciesPage,
  productPage,
  industry,
  faqItem,
  article,

  // Object types
  imageWithAlt,
  ctaBlock,
  seoFields,
  specRow,
  gradeStocked,
  thicknessSpec,
  relatedSpeciesRef,
  sectionBlock,
  productTile,
  industryRef,
  blockContent,
];
