import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getSinglePrayer } from '../../../utils/data/prayerData';
import PrayerForm from '../../../components/prayers/PrayerForm';

export default function EditPrayer() {
  const [editPrayer, setEditPrayer] = useState({});
  const router = useRouter();
  const { prayerId } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSinglePrayer(prayerId).then(setEditPrayer);
  }, [prayerId]);

  return (
    <PrayerForm object={editPrayer} user={user} />
  );
}
