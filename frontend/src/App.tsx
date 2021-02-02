import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import {
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword,
  SignIn,
  SignUp,
  VerifyContact,
  withAuthenticator,
} from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';
import logo from './logo.svg';
import { SignInCard } from './components/auth/SignInCard';
import { AddMovie, Movie } from './components/AddMovie';
import { Testimonial } from './components/Testimonial';
import { Button } from './components/Button';
import { Footer } from './components/Footer';

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

/*export default withAuthenticator(App, false, [
    <SignIn/>,
    <ConfirmSignIn/>,
    <VerifyContact/>,
    <SignUp/>,
    <ConfirmSignUp/>,
    <ForgotPassword/>,
    <RequireNewPassword/>
]);*/

async function getUser() {
  const user = await Auth.currentUserInfo();
  console.log(user);
  return user;
}

async function checkCognitoUserSession() {
  //debugger;
  return (await Auth.currentSession()).getIdToken().getJwtToken();

  // const getAwsCredentials = await Auth.currentCredentials();
  // const awsCredentials = await Auth.essentialCredentials(getAwsCredentials);
  //
  // // accessKeyId, secretAccessKey, sessionToken post login
  // return { awsCredentials };
}

async function putMovie(movie: Movie) {
  const token = await checkCognitoUserSession();
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
}

async function getProfile() {
  await getUser();
  const token = await checkCognitoUserSession();
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
}

interface PropsContainer {}

function Container({ children }: React.PropsWithChildren<PropsContainer>) {
  // <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  );
}

interface PropsBasicCard {}

function BasicCard({ children }: React.PropsWithChildren<PropsBasicCard>) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}

function SimpleSectionHeading(props) {
  return (
    <div className="pb-5 border-b border-gray-200">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {props.heading}
      </h3>
    </div>
  );
}
