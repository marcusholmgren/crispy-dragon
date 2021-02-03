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
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
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
          <Button onClick={getProfile}>Set Profile</Button>
          <button
            onClick={getProfile}
            className="p-1 bg-yellow-600 text-capitalize"
          >
            Get Profile
          </button>
        </BasicCard>
        <p>
          Page has been open for <code>{count}</code> seconds.
        </p>
        <p className="bg-green-500">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
      <SimpleSectionHeading heading="Add your stuff" />
      <AddMovie onSubmit={putMovie} />
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

