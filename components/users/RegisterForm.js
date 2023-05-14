/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import updateUser from '../../utils/data/userData';
// eslint-disable-next-line no-unused-vars
import { registerUser } from '../../utils/auth'; // Update with path to registerUser

const initialState = {
  firstName: '',
  lastName: '',
  createdOn: '',
  profileImageUrl: '',
};
// eslint-disable-next-line no-unused-vars
function RegisterForm({ user, onUpdate }) {
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();
  // console.warn(obj.id);

  useEffect(() => {
    if (user.id) {
      setFormData(user);
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      updateUser(formData, user.id);
      router.push(`../../users/${user.id}`);
    } else {
      registerUser(user, formData).then(() => user.uid);
    }
  };

  const handleChange = (e) => {
    console.warn(formData);
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control name="firstName" required onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="lastName" required onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control name="profileImageUrl" required onChange={handleChange} />
      </Form.Group>
      {/* <Button type="submit">{obj.id ? 'Update' : 'Create'}</Button> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func,
};

export default RegisterForm;
