import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import VerseForm from '../../../components/verses/VerseForm';
import { getSingleVerse } from '../../../utils/data/verseData';
import { useAuth } from '../../../utils/context/authContext';

export default function EditVerse() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { verseId } = router.query;
  const { user } = useAuth();
  useEffect(() => {
    getSingleVerse(verseId).then(setEditItem);
  }, [verseId]);
  return (<VerseForm verseObj={editItem} user={user} />);
}
