import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

export const getVersions = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/versions`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export const getSingleVersion = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/versions/${id}`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export const addVersion = (version) => new Promise((resolve, reject) => {
  const catObj = {
    label: version.label,
  };
  fetch(`${dbUrl}/versions`, {
    method: 'POST',
    body: JSON.stringify(catObj),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((err) => reject(err));
});

export const updateVersion = (version, versionId) => new Promise((resolve, reject) => {
  const versionObj = {
    label: version.label,
  };
  fetch(`${dbUrl}/versions/${versionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(versionObj),
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

export const deleteVersion = (versionId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/versions/${versionId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});
