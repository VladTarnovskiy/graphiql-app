interface Query {
  character(id: number): Character;
  characters(page?: number, filter?: FilterCharacter): Characters;
  charactersByIds(ids: [number]): [Character];
  location(id: number): Location;
  locations(page?: number, filter?: FilterLocation): Locations;
  locationsByIds(ids: [number]): [Location];
  episode(id: number): Episode;
  episodes(page?: number, filter?: FilterEpisode): Episodes;
  episodesByIds(ids: [number]): [Episode];
}

interface Character {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: Location;
  location?: Location;
  image?: string;
  episode: [Episode];
  created?: string;
}

interface Location {
  id?: number;
  name?: string;
  type?: string;
  dimension?: string;
  residents: [Character];
  created?: string;
}

interface Episode {
  id?: number;
  name?: string;
  air_date?: string;
  episode?: string;
  characters: [Character];
  created?: string;
}

interface FilterCharacter {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

interface Characters {
  info?: Info;
  results?: [Character];
}

interface Info {
  count?: number;
  pages?: number;
  next?: number;
  prev?: number;
}

interface FilterLocation {
  name?: string;
  type?: string;
  dimension?: string;
}

interface Locations {
  info?: Info;
  results?: [Location];
}

interface FilterEpisode {
  name?: string;
  episode?: string;
}

interface Episodes {
  info?: Info;
  results?: [Episode];
}
