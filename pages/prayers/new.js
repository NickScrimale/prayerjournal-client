import React from 'react';
import PrayerForm from '../../components/prayers/PrayerForm';
import { useAuth } from '../../utils/context/authContext';

export default function New() {
  const { user } = useAuth();

  return (
    <PrayerForm user={user} />
  );
}
