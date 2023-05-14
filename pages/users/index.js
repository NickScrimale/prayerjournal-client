/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import UserCard from '../../components/users/UserCard';
import { getSingleUser } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [journalUsers, setJournalUsers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    getSingleUser(user.uid).then((setJournalUsers));
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          router.push('/users');
        }}
      >
        Users
      </Button>
      <article className="users">
        <h1>Users</h1>
        {journalUsers.map((journalUser) => (
          <section key={`user--${journalUser.id}`} className="user">
            <UserCard
              id={journalUser.id}
              firstName={journalUser.first_name}
              lastName={journalUser.last_name}
              imageUrl={journalUser.image_url}
              onUpdate={setJournalUsers}
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
