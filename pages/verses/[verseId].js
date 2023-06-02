import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleVerse } from '../../utils/data/verseData';

export default function ViewVerse() {
  const [showVerse, setVerse] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { verseId } = router.query;

  useEffect(() => {
    getSingleVerse(verseId).then(setVerse);
  }, [verseId]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <h1>{user.first_name} {user.last_name}</h1>
        <h3>{showVerse.verse}</h3>
        <p>{showVerse.content}</p>
        <footer>Version: {showVerse.version_id?.label}</footer>
      </div>
    </div>
  );
}
