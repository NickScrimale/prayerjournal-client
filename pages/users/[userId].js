import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../utils/data/userData';
import UserCard from '../../components/users/UserCard';

export default function ViewUser() {
  const [viewUsers, setViewUser] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setViewUser);
  }, [id]);

  return (
    <div className="view-card">
      <UserCard
        key={viewUsers}
        // userCardObj={getUserById}
        id={viewUsers.id}
        first_name={viewUsers.first_name}
        last_name={viewUsers.last_name}
        uid={viewUsers.uid}
        profile_image_url={viewUsers.profile_image_url}
        onUpdate={getSingleUser}
      />
    </div>

  );
}
