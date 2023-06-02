import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getVerses = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/verses`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// const getSingleVerse = (verseId) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/verses/${verseId}`).then((response) => response.json())
//     .then((data) => {
//       resolve({
//         id: data.id,
//         userId: data.user_id,
//         versionId: data.version_id,
//         verse: data.verse,
//         content: data.content,
//       });
//     }).catch((error) => reject(error));
// });

const getSingleVerse = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/verses/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createVerse = (verseObj, user) => new Promise((resolve, reject) => {
  const verse = {
    version_id: Number(verseObj.version_id),
    verse: verseObj.verse,
    content: verseObj.content,
    uid: user.id,
  };
  fetch(`${dbUrl}/verses`, {
    method: 'POST',
    body: JSON.stringify(verse),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteVerse = (verseId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/verses/${verseId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updateVerse = (user, verse, verseId) => new Promise((resolve, reject) => {
  const verseObj = {
    version_id: Number(verse.version_id.id),
    verse: verse.verse,
    content: verse.content,
    uid: user.id,
  };
  fetch(`${dbUrl}/verses/${verseId}`, {
    method: 'PUT',
    body: JSON.stringify(verseObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getVerses, getSingleVerse, deleteVerse, updateVerse, createVerse,
};
