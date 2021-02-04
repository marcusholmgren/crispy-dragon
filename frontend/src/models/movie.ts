export interface Movie {
    info: MovieInfo;
    user_id: string;
    title: string;
}

export interface MovieInfo {
    rating: number;
    year:   number;
    plot:   string;
}
