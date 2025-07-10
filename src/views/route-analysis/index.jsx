import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addFileData } from '../../redux/slices/fileSlice'; // Adjust path as needed

const UploadRouteCSV = () => {
  const dispatch = useDispatch();
  const [file, setFile] = React.useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setFile(file);
      //   const formData = new FormData();
      //   formData.append('file', file);
      //   //   dispatch(uploadFile(formData));
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-sm border-0 rounded">
        <Card.Header className="bg-primary text-white d-flex align-items-center">
          <FaUpload className="me-2" />
          <strong>Upload Route CSV</strong>
        </Card.Header>

        <Card.Body className="text-center border border-dashed rounded m-3 p-5" style={{ borderColor: '#d3d3d3', borderStyle: 'dashed' }}>
          {/* Hidden file input */}
          <input type="file" id="file-upload" accept=".csv" onChange={handleUpload} style={{ display: 'none' }} />

          {/* Clickable upload area */}
          <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
            <FaUpload size={40} color="#d3d3d3" />
            <h4 className="mt-3">Drag & Drop CSV File or Click to Browse</h4>
            <p className="text-muted">Upload CSV file with latitude, longitude coordinates</p>
          </label>

          <Row className="justify-content-center mt-4">
            <Col xs="auto" className="mb-2">
              <Button variant="success">SQLite Storage</Button>
            </Col>
            <Col xs="auto" className="mb-2">
              <Button variant="info">API Tracking</Button>
            </Col>
            <Col xs="auto" className="mb-2">
              <Button variant="warning" className="text-white">
                Image Storage
              </Button>
            </Col>
            <Col xs="auto" className="mb-2">
              <Button variant="danger">Enhanced PDF</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UploadRouteCSV;
