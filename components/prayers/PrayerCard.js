import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deletePrayer } from '../../utils/data/prayerData';

export default function PrayerCard({
  firstName, lastName, onUpdate, id, pubDate, content,
}) {
  const deleteThisPrayer = () => {
    if (window.confirm('Delete?')) {
      deletePrayer(id).then(() => onUpdate());
      // window.location.reload();
    }
  };
  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Header>{firstName} {lastName}</Card.Header>
          <Card.Title>{pubDate}</Card.Title>
          <Card.Text>{content}</Card.Text>
          <Link href={`/prayers/${id}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          <Link href={`/prayers/edit/${id}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisPrayer} className="m-2">
            DELETE
          </Button>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

PrayerCard.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  pubDate: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
