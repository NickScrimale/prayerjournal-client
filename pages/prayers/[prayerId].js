import React, { useEffect, useState } from 'react';
// import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSinglePrayer } from '../../utils/data/prayerData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewPrayers() {
  const [viewPrayer, setPrayer] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { prayerId } = router.query;

  useEffect(() => {
    getSinglePrayer(prayerId).then(setPrayer);
  }, [prayerId]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <h3>{viewPrayer.pub_date}</h3>
        <h5>{user.first_name} {user.last_name}</h5>
        <p>{viewPrayer.content}</p>

      </div>
    </div>
  );
}
