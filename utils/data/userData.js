import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: Number(data.id),
        uid: data.uid,
        first_name: data.first_name,
        last_name: data.last_name,
        profile_image_url: data.profile_image_url,
      });
    }).catch((error) => reject(error));
});

const createUser = (user) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch((error) => reject(error));
});

const updateUser = (userObj, userId) => new Promise((resolve, reject) => {
  const newUserObj = {
    first_name: userObj.firstName,
    last_name: userObj.lastName,
    profile_image_url: userObj.profileImageUrl,
  };
  fetch(`${dbUrl}/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(newUserObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(resolve)
    .catch(reject);
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getSingleUser, updateUser, deleteUser, createUser,
};
