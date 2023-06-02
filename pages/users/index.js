/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
import { Image } from 'react-bootstrap';
import UserCard from '../../components/users/UserCard';
import { getSingleUser } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [journalUsers, setJournalUsers] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    getSingleUser(user.uid).then((setJournalUsers));
  }, []);
  // console.warn(user);
  return (
    <>
      <article className="users">
        <h1>Hello {user.first_name} {user.last_name}! </h1>
        <div>
          <Image src={user.profile_image_url} />
        </div>
      </article>
    </>
  );
}

export default Home;
