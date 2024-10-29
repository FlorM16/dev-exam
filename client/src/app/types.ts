
export interface Character {
  name: string;
  birth_year: string;

}

export interface Movie {
  episode_id: number;
  title: string;
  director: string;
  opening_crawl: string;
  characters: string[]; 
}
