import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteUser } from '../../utils/data/userData';
// import { signOut } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';

export default function UserCard({
  firstName, lastName, profileImageUrl, id, onUpdate,
}) {
  const { user } = useAuth();
  const deleteThisUser = () => {
    if (window.confirm('Delete?')) {
      deleteUser(id).then(() => onUpdate());
      window.location.reload();
    }
  };
  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>{firstName} {lastName}</Card.Title>
          <Card.Img variant="top" src={profileImageUrl} alt={firstName} style={{ height: '200px' }} />
          <Link href={`/users/edit/${user.id}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisUser} className="m-2">
            DELETE
          </Button>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
