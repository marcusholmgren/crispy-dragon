import type { Movie } from '../models';
import { getUserToken } from './getUserToken';

interface AddMovieResponse {
  item: Movie;
}

export interface GetMoviesResponse {
  items: Movie[];
}

export interface PutMovieResponse {
  item: Movie;
}

export interface MovieRequest {
  title: string;
  plot: string;
  year: number;
  rating: number;
}

export interface UpdateMovieRequest {
  year: number;
  actors: string[];
  plot: string;
}

export async function uploadMovieAttachment(
  file: File,
  url: string,
): Promise<boolean> {
  const response = await fetch(url, {
    body: file,
    method: 'PUT',
    mode: 'cors',
  });
  return response.ok;
}

export async function getUploadUrl(title: string): Promise<string> {
  const token = await getUserToken();
  const response = await fetch(
    `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/movies/${title}/attachment`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    },
  );

  return await response.json();
}

export async function deleteMovie(title: string) {
  const token = await getUserToken();
  const response = await fetch(
    `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/movies/${title}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
      mode: 'cors',
      credentials: 'omit',
    },
  );

  return response.ok;
}

export async function updateMovie(title: string, movie: UpdateMovieRequest) {
  const token = await getUserToken();
  const response = await fetch(
    `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/movies/${title}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
      method: 'PATCH',
      mode: 'cors',
      credentials: 'omit',
    },
  );

  return response.ok;
}

export async function addMovie(
  movie: MovieRequest,
): Promise<Movie | undefined> {
  const token = await getUserToken();
  const response = await fetch(
    `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/movies`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
      method: 'PUT',
      mode: 'cors',
      credentials: 'omit',
    },
  );

  if (response.ok) {
    const data: AddMovieResponse = await response.json();
    return data.item;
  } else {
    const body = await response.text();
    console.log(
      `Failed with status: ${response.status}, body: ${JSON.stringify(
        body,
        null,
        2,
      )}`,
    );
  }
  return;
}

export async function getMovies(
  setMovies: (value: ((prevState: Movie[]) => Movie[]) | Movie[]) => void,
) {
  const token = await getUserToken();
  const response = await fetch(
    `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/movies`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors',
      credentials: 'omit',
    },
  );

  if (response.ok) {
    const data: GetMoviesResponse = await response.json();
    setMovies(data.items);
  } else {
    const body = await response.text();
    console.log(
      `Failed with status: ${response.status}, body: ${JSON.stringify(
        body,
        null,
        2,
      )}`,
    );
  }
  return response.ok;
}
