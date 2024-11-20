export interface BioPageContent {
  name: string;
  description: string;
  avatarUrl: string;
  links: Array<{ title: string; url: string }>;
  socialLinks: Array<{ platform: string; url: string }>;
}
