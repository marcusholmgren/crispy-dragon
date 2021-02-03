import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import {
    withAuthenticator,
} from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';
import logo from './logo.svg';
import { AddMovie, Movie } from './components/AddMovie';
import { Testimonial } from './components/Testimonial';
import { Button } from './components/Button';
import { Footer } from './components/Footer';
import {Container} from "./components/Container";
import {BasicCard} from "./components/BasicCard";
import {SimpleSectionHeading} from "./components/SimpleSectionHeading";

interface AppProps {}

function App({}: AppProps) {
    const [movies, setMovies] = useState<object[]>([])
  // Create the count state.
  // const [count, setCount] = useState(0);
  // // Create the counter (+1 every second).
  // useEffect(() => {
  //   const timer = setTimeout(() => setCount(count + 1), 1000);
  //   return () => clearTimeout(timer);
  // }, [count, setCount]);
  // Return the App component.
  return (
    <Container>
      <Testimonial
        title="Crispy Dragon"
        quote="You may delay, but time will not, and lost time is never found again."
        source="Benjamin Franklin"
      />
      <header className="bg-red-500">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <BasicCard>
          <Button onClick={() => getMovies(setMovies)}>Set Profile</Button>
          <button
            onClick={getProfile}
            className="p-1 bg-yellow-600 text-capitalize"
          >
            Get Profile
          </button>
        </BasicCard>
      </header>
      <SimpleSectionHeading heading="Add your stuff" />
      <AddMovie onSubmit={putMovie} />
      <SimpleSectionHeading heading="Movies" />
      <HorizontalLinkCard movies={movies}/>
      <Footer />
    </Container>
  );
}

export default withAuthenticator(App, true);

async function getUser() {
  const user = await Auth.currentUserInfo();
  console.log(user);
  return user;
}

async function getUserToken() {
  return (await Auth.currentSession()).getIdToken().getJwtToken();
}

async function putMovie(movie: Movie) {
  const token = await getUserToken();
  const response = await fetch(
    'https://cjn5ioxpab.execute-api.us-east-1.amazonaws.com/movies',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      referrer: 'http://localhost:8080/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: JSON.stringify(movie),
      method: 'PUT',
      mode: 'cors',
      credentials: 'omit',
    },
  );

  if (response.ok) {
    const data = await response.json();
    console.log(
      `Status: ${response.status}, data: ${JSON.stringify(data, null, 2)}`,
    );
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
  return response.ok
}

async function getMovies(setMovies: ([]) => void) {
    const token = await getUserToken();
    const response = await fetch(
        'https://cjn5ioxpab.execute-api.us-east-1.amazonaws.com/movies',
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
                  mode: 'cors',
      credentials: 'omit',
        }
    )

      if (response.ok) {
    const data = await response.json();
    setMovies(data.items);
    console.log(
      `Status: ${response.status}, data: ${JSON.stringify(data, null, 2)}`,
    );
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
  return response.ok
}

async function getProfile() {
  await getUser();
  const token = await getUserToken();
  const response = await fetch(
    'https://cjn5ioxpab.execute-api.us-east-1.amazonaws.com/user/profile',
    {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      referrer: 'http://localhost:8080/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
    },
  );
  if (response.ok) {
    const data = await response.json();
    console.log(
      `Status: ${response.status}, data: ${JSON.stringify(data, null, 2)}`,
    );
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
  return response.ok
}



function HorizontalLinkCard(props: {movies: object[]}) {

    const el = props.movies.map(movie => (
         <div
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full"
                         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                         alt="" />
                </div>
                <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        <p className="text-sm font-medium text-gray-900">
                            {movie.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {movie.info.year}
                        </p>
                    </a>
                </div>
            </div>
    ))

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {el}

            <div
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full"
                         src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                         alt="" />
                </div>
                <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        <p className="text-sm font-medium text-gray-900">
                            Michael Foster
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            Co-Founder / CTO
                        </p>
                    </a>
                </div>
            </div>

            <div
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full"
                         src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                         alt="" />
                </div>
                <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        <p className="text-sm font-medium text-gray-900">
                            Dries Vincent
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            Manager, Business Relations
                        </p>
                    </a>
                </div>
            </div>

            <div
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full"
                         src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                         alt="" />
                </div>
                <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        <p className="text-sm font-medium text-gray-900">
                            Lindsay Walton
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            Front-end Developer
                        </p>
                    </a>
                </div>
            </div>
        </div>
    )
}