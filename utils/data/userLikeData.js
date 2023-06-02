import { clientCredentials } from '../client';

const getLikeByUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/userlikes?user=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteUserLike = (userLikeId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/userlikes/${userLikeId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const createUserLike = (userLike) => new Promise((resolve, reject) => {
  const userLikeObj = {
    verse_id: Number(userLike.verseId),
    uid: String(userLike.uid),
  };
  fetch(`${clientCredentials.databaseURL}/userlikes`, {
    method: 'POST',
    body: JSON.stringify(userLikeObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export { getLikeByUser, deleteUserLike, createUserLike };
