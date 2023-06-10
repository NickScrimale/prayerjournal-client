import { Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { deleteVersion, getVersions } from '../../utils/data/versionData';
import VersionForm from '../../components/versions/VersionForm';

function VersionsPage() {
  const [versions, setVerisons] = useState([]);

  const getAllVersions = () => {
    getVersions().then(setVerisons);
  };

  useEffect(() => {
    getAllVersions();
  }, [versions]);

  return (
    <>
      <VersionForm object={{}} />
      <h2>Categories</h2>
      <Table striped bordered hover>
        <tbody>
          {
            versions?.map((version) => (
              <tr key={version.id}>
                <td>
                  <Link href={`/versions/edit/${version.id}`} passhref="true">
                    <Button size="sm" variant="dark">
                      EDIT
                    </Button>
                  </Link>
                  <Button variant="danger" onClick={() => deleteVersion(version.id).then(() => getAllVersions())}>Delete</Button>
                </td>
                <td>{version.label}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
}

export default VersionsPage;
