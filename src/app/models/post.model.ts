export interface Post {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  published_at: string;
  tags: string[];
  url: string;
  user: {
    name: string;
    profile_image: string;
  };
  reading_time_minutes: number;
}