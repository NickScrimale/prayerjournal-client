import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleVersion } from '../../../utils/data/versionData';
import VersionForm from '../../../components/versions/VersionForm';

export default function EditVersion() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { versionId } = router.query;
  useEffect(() => {
    getSingleVersion(versionId).then(setEditItem);
  }, [versionId]);
  return (
    <VersionForm object={editItem} />
  );
}
