export const FIRST_GAME_STEP = 0;
export const MAX_MISTAKE_COUNT = 3;

export enum AppRoute {
  Login = '/login',
  Lose = '/lose',
  Result = '/result',
  Root = '/',
  Game = '/game'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum GameType {
  Artist = 'artist',
  Genre = 'genre',
}

export enum APIRoute {
  Questions = '/questions',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  Data = 'DATA',
  Game = 'GAME',
  User = 'USER',
}
