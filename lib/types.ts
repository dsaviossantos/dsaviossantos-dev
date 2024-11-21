export interface BioPageContent {
  name: string;
  description: string;
  avatarUrl: string;
  links: Array<UrlLink>;
  socialLinks: Array<SocialLink>;
}

export interface UserDataDB {
  id: number;
  email: string;
  password: string;
}

export interface UrlLink {
  title: string;
  url: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}
