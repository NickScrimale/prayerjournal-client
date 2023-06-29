import { clientCredentials } from '../client';

const getLikeByUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/userlikes?user=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteUserLike = (userLikeId) => fetch(`${clientCredentials.databaseURL}/userlikes/${userLikeId}`, {
  method: 'DELETE',
});

const createUserLike = (userLike) => {
  const userLikeObj = {
    verse_id: Number(userLike.verseId),
    user_id: Number(userLike.userId),
  };
  return fetch(`${clientCredentials.databaseURL}/userlikes`, {
    method: 'POST',
    body: JSON.stringify(userLikeObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
};

export { getLikeByUser, deleteUserLike, createUserLike };
