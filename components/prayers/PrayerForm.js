/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { createPrayer, getPrayers, updatePrayer } from '../../utils/data/prayerData';

const initialState = {
  pub_date: '',
  content: '',
};

function PrayerForm({ object, user }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setPrayer] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getPrayers().then(setPrayer);
    if (object.id) setFormInput(object);
  }, [object]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (object.id) {
      updatePrayer(user, formInput, object.id)
        .then(() => router.push('/prayers'));
    } else {
      const payload = { ...formInput };
      createPrayer(payload, user).then(setFormInput(initialState));
    }
  };

  return (
    <Form className="form-floating" onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{object.id ? 'Update' : 'Create'} a Prayer</h2>
      <FloatingLabel controlId="floatingInput1" label="Publication Date" className="mb-3">
        <Form.Control type="text" placeholder="Publication Date" name="pub_date" value={formInput.pub_date} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Content" className="mb-3">
        <Form.Control type="text" placeholder="Content" name="content" value={formInput.content} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{object.id ? 'Update' : 'Create'} Prayer</Button>
    </Form>
  );
}

PrayerForm.propTypes = {
  object: PropTypes.shape({
    id: PropTypes.number,
    pub_date: PropTypes.string,
    content: PropTypes.string,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

PrayerForm.defaultProps = {
  object: initialState,
};

export default PrayerForm;
