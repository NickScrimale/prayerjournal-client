import { FormControlLabel, Checkbox } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteVerse } from '../../utils/data/verseData';
import { createUserLike, deleteUserLike } from '../../utils/data/userLikeData';
import { useAuth } from '../../utils/context/authContext';

export default function VerseCard({
  version, onUpdate, verse, id, firstName, lastName, content, userLikesArray, onLikeUpdate,
}) {
  const { user } = useAuth();
  const deleteThisVerse = () => {
    if (window.confirm('Delete?')) {
      deleteVerse(id).then(() => onUpdate());
    }
  };

  const handleCheckChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      createUserLike({ verseId: id, userId: user.id }).then(() => onLikeUpdate());
      console.warn(user.id);
    } else {
      const userLike = userLikesArray.find((ul) => ul.verse_id === id);
      if (userLike) {
        deleteUserLike(userLike.id).then(() => onLikeUpdate());
      }
    }
  };

  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Header>{firstName} {lastName}</Card.Header>
        <Card.Body>
          <Card.Title>{verse}</Card.Title>
          <Card.Text>{content}</Card.Text>
          <Card.Footer>{version}</Card.Footer>
          <div style={{
            margin: 'auto',
            display: 'block',
            width: 'fit-content',
          }}
          >
            <FormControlLabel
              control={(
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name="checkedH"
                  checked={!!userLikesArray.find((ul) => id === ul.verse_id)}
                  onChange={handleCheckChange}
                />
                )}
            />
          </div>
          <Link href={`../verses/${id}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          <Link href={`../verses/edit/${id}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisVerse} className="m-2">
            DELETE
          </Button>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

VerseCard.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  // user: PropTypes.string.isRequired,
  verse: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  userLikesArray: PropTypes.arrayOf(Object).isRequired,
  onLikeUpdate: PropTypes.func.isRequired,
};
