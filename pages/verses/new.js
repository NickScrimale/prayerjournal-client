import React from 'react';
import { useAuth } from '../../utils/context/authContext';
import VerseForm from '../../components/verses/VerseForm';

export default function AddVerse() {
  const { user } = useAuth();

  return (
    <VerseForm user={user} />
  );
}
