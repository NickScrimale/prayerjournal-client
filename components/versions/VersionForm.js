/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { addVersion, getVersions, updateVersion } from '../../utils/data/versionData';

const initialState = {
  label: '',
};

function VersionForm({ object }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setVersion] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getVersions().then(setVersion);
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
      updateVersion(formInput, object.id)
        .then(() => router.push('/versions'));
    } else {
      const payload = { ...formInput };
      addVersion(payload).then(setFormInput(initialState));
    }
  };
  return (
    <Form className="form-floating" onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{object.id ? 'Update' : 'Create'} a Version</h2>
      <FloatingLabel controlId="floatingInput1" label="Version Name" className="mb-3">
        <Form.Control type="text" placeholder="Label" name="label" value={formInput.label} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{object.id ? 'Update' : 'Create'} Version</Button>
    </Form>
  );
}

VersionForm.propTypes = {
  object: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

VersionForm.defaultProps = {
  object: initialState,
};

export default VersionForm;
