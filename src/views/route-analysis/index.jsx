import React, { useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addFileData } from '../../redux/slices/fileSlice'; // Adjust path as needed
import apiService from '../../utils/ApiService';

const UploadRouteCSV = () => {
  const [route, setRoute] = React.useState(null);
  const dispatch = useDispatch();
  const [file, setFile] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  const handleUpload = async (e) => {
    console.log(e);
    try {
      const file = e.target.files[0];
      if (file) {
        setFile(file);
      }
      const formData = new FormData();

      // Add file (note: in browser, you'd use a file input)
      // For Node.js, you might need fs.createReadStream()
      formData.append('gpsFile', file); // Replace with your file object

      // Add other form fields
      formData.append('fromCode', '1146');
      formData.append('fromName', 'meerut depot');
      formData.append('toCode', '0041025372');
      formData.append('toName', 'moti filling station');
      formData.append('routeName', 'MEERUT to MOTI FIlling STation');
      formData.append('terrain', 'mixed');

      const response = await apiService.post('/routes/upload-gps-route', formData, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload successful:', response.data);
      return response.data;
    } catch (error) {}
  };

  useEffect(() => {
    const routeData = localStorage.getItem('selectedRoute');
    if (routeData) {
      setRoute(JSON.parse(routeData));
      console.log('Route Data from URL:', JSON.parse(routeData));
    }
    const isUserExists = localStorage.getItem('user') || sessionStorage.getItem('user');
    const parsedUser = isUserExists ? JSON.parse(isUserExists) : null;
    console.log(parsedUser?.user, 'profile');
    setUserData(parsedUser);
  }, []);

  return (
    <Container className="my-5">
      <Card className="shadow-sm border-0 rounded">
        <Card.Header className="bg-brand-color-1 text-white d-flex align-items-center">
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
              <Button variant="primary">SQLite Storage</Button>
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
