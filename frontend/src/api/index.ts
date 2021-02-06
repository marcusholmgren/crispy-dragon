export * from './movies';
export * from './getUserToken';

import { getUserToken } from './getUserToken';

import { Auth } from 'aws-amplify';

async function getUser() {
  const user = await Auth.currentUserInfo();
  console.log(user);
  return user;
}

export async function getProfile() {
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
  return response.ok;
}
