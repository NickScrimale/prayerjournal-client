import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPrayers } from '../../utils/data/prayerData';
import PrayerCard from '../../components/prayers/PrayerCard';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [publicPrayers, setPrayer] = useState([]);
  const { user } = useAuth();

  const loadPrayers = () => {
    getPrayers().then((setPrayer));
  };

  useEffect(() => {
    loadPrayers();
  }, []);

  // useEffect(() => {
  //   getPrayers().then((setPrayer));
  // }, []);

  return (
    <article className="prayers">
      {/* <Button onClick={() => router.push('./new')}>Add a Prayer</Button> */}
      <Link href="/prayers/new" passHref>
        <Button variant="info">Add a Prayer</Button>
      </Link>
      <h1>Prayer Journal</h1>
      {publicPrayers.map((publicPrayer) => (
        <section key={`user--${publicPrayer.id}`} className="user">
          <PrayerCard
            id={publicPrayer.id}
            pubDate={publicPrayer.pub_date}
            content={publicPrayer.content}
            firstName={user.first_name}
            lastName={user.last_name}
            onUpdate={loadPrayers}
          />
        </section>
      ))}
    </article>
  );
}
export default Home;
