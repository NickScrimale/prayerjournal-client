import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import VerseCard from '../components/verses/VerseCard';
import { getVerses } from '../utils/data/verseData';
import { getLikeByUser } from '../utils/data/userLikeData';

function Home() {
  const { user } = useAuth();
  const [userLikesArray, setUserLikesArray] = useState([]);
  const [Verses, setVerses] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getVerses().then((setVerses));
  }, []);

  useEffect(() => {
    getLikeByUser(user.id).then(setUserLikesArray);
  }, [user]);

  return (
    <article className="verses">
      <h1>Verses</h1>
      <Link href="/verses/new" passHref>
        <Button variant="info">Add a Verse</Button>
      </Link>
      {Verses.map((Verse) => (
        <VerseCard
          key={Verse.id}
          id={Verse.id}
          verse={Verse.verse}
          content={Verse.content}
          firstName={user.first_name}
          lastName={user.last_name}
          version={Verse.version_id.label}
          userLikesArray={userLikesArray}
          onUpdate={getVerses}
        />
      ))}
    </article>
  );
}

export default Home;
