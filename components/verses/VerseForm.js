import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getVersions } from '../../utils/data/versionData';
import { createVerse, getSingleVerse, updateVerse } from '../../utils/data/verseData';

const initialState = {
  verse: '',
  content: '',
  version_id: {
    id: 0,
    label: '',
  },
};

export default function VerseForm({ verseObj, user }) {
  const [currentVerse, setCurrentVerse] = useState(initialState);
  const [versions, setVersions] = useState([]);
  // const [setSelectedVersion] = useState();
  const router = useRouter();

  useEffect(() => {
    getVersions().then(setVersions);
    if (verseObj.id) {
      getSingleVerse(verseObj.id).then((response) => {
        setCurrentVerse(response);
        // setSelectedVersion(verseObj.version_id.id);
      });
    }
  }, [verseObj]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'version_id') {
  //     // setSelectedVersion(value);
  //     setCurrentVerse((prevState) => ({
  //       ...prevState,
  //       [name]: versions.find((v) => v.id === parseInt(value, 10)),
  //     }));
  //   } else {
  //     setCurrentVerse((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'version_id') {
      setCurrentVerse((prevState) => ({
        ...prevState,
        [name]: versions.find((v) => v.id === parseInt(value, 10)) || initialState.version_id,
      }));
    } else {
      setCurrentVerse((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (verseObj.id) {
      updateVerse(user, currentVerse, verseObj.id)
        .then(() => router.push('/'));
    } else {
      const payload = { ...currentVerse };
      createVerse(payload, user).then(setCurrentVerse(initialState))
        .then(() => router.push('/'));
      console.warn(payload);
    }
  };

  return (
    <Form className="form-floating" onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{verseObj.id ? 'Update' : 'Create'} a Verse</h2>
      <FloatingLabel controlId="floatingInput1" label="Book, Chapter & Verse" className="mb-3">
        <Form.Control type="text" placeholder="Book, Chapter & Verse" name="verse" value={currentVerse.verse} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Content" className="mb-3">
        <Form.Control type="text" placeholder="Content" name="content" value={currentVerse.content} onChange={handleChange} required />
      </FloatingLabel>
      <Form.Group className="mb-3">
        <Form.Select onChange={handleChange} className="mb-3" name="version_id" value={currentVerse.version_id.id} required>
          <option value="">Select a Version</option>
          {versions.map((version) => (
            <option key={version.id} value={version.id}>
              {version.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button type="submit" disabled={!currentVerse.version_id}>
        {verseObj.id ? 'Update' : 'Create'} Verse
      </Button>
    </Form>
  );
}

VerseForm.propTypes = {
  verseObj: PropTypes.shape({
    id: PropTypes.number,
    verse: PropTypes.string,
    content: PropTypes.string,
    version_id: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

VerseForm.defaultProps = {
  verseObj: initialState,
};
