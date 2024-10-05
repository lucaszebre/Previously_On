/* eslint-disable @typescript-eslint/no-explicit-any */

export type Stats = {
    friends: number;
    shows: number;
    seasons: number;
    episodes: number;
    comments: number;
    progress: number;
    episodes_to_watch: number;
    time_on_tv: number;
    time_to_spend: number;
    movies: number;
    badges: number;
    member_since_days: number;
    friends_of_friends: number;
    episodes_per_month: number;
    favorite_day: string | null;
    five_stars_percent: number;
    four_five_stars_total: number; 
    streak_days: number;
    favorite_genre: string | null;
    written_words: number;
    without_days: number;
    shows_finished: number;
    shows_current: number;
    shows_to_watch: number;
    shows_abandoned: number;
    movies_to_watch: number;
    time_on_movies: number;
    time_to_spend_movies: number;
  };
  
  export type Options = {
    downloaded: boolean;
    notation: boolean;
    timelag: boolean;
    global: boolean;
    specials: boolean;
    profil: boolean;
    episodes_tri: string | null; 
    friendship: 'open' | 'closed' | string; 
    country: string;
    language: string;
    mail_mois: boolean;
    mail_hebdo: boolean;
    notification_news: boolean;
    twitter_auto: boolean;
    comment_language: string;
    display_shows: 'grid' | 'list' | string; 
    display_movies: 'grid' | 'list' | string; 
    only_svod: boolean;
  };
  
  export type Member = {
    id: number;
    login: string;
    xp: number;
    locale: string;
    cached: number;
    avatar: string | null; 
    profile_banner: string | null; 
    in_account: boolean;
    is_private: boolean;
    is_blocked: boolean;
    is_admin: boolean;
    premium: boolean;
    subscription: number; 
    valid_email: boolean;
    screeners: any[]; 
    twitterLogin: string | null; 
    stats: Stats;
    options: Options;
  };
  
  export type ResponseData = {
    member: Member;
    errors: string[]; 
  };
  