import React, { useEffect } from 'react';
import { Card, Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addFileData, addFileDataResponse } from '../../redux/slices/fileSlice'; // Adjust path as needed
import apiService from '../../utils/ApiService';
import { toast } from 'react-toastify';
import Timeout from '../../components/timeout/Timeout';

const UploadRouteCSV = () => {
  const [route, setRoute] = React.useState(null);
  const dispatch = useDispatch();
  const [file, setFile] = React.useState(null);
  const [userData, setUserData] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [collectDataProgress, setCollectDataProgress] = React.useState(false);

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        setFile(file);
      }
      const formData = new FormData();
      console.log(file, 'file object');
      // Add file (note: in browser, you'd use a file input)
      // For Node.js, you might need fs.createReadStream()
      formData.append('gpsFile', file); // Replace with your file object

      // Add other form fields
      formData.append('fromCode', route?.bu_code || '0041025372');
      formData.append('fromName', route?.location || 'meerut depot');
      formData.append('toCode', route?.row_labels || '0041025372');
      formData.append('toName', route?.customer_name || 'moti filling station');
      formData.append('routeName', `${route?.location} to ${route?.customer_name}` || 'MEERUT to MOTI FIlling STation');
      formData.append('terrain', 'mixed');

      const response = await apiService.post('/routes/upload-gps-route', formData, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // console.log('Upload successful:', response.data);
      toast.success(response?.message || 'File uploaded successfully!');
      setData(response.data);
      localStorage.setItem('routeData', JSON.stringify(response.data)); // Store route data in localStorage
      dispatch(addFileDataResponse(response.data)); // Dispatch the file data to Redux store
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error(error?.message || 'File upload failed. Please try again.');
      // Handle error (show toast, etc.)
      throw error; // Re-throw to handle in the calling function
    }
  };
  const handleCollectData = async () => {
    try {
      if (!data) {
        toast.error('No route data available to collect.');
        return;
      }
      setCollectDataProgress(true);
      const response = await apiService.post(
        `/routes/${data?.route?.id}/collect-all-data`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`
          }
        }
      );
      // console.log('Data collection started:', response.data);
      setCollectDataProgress(false); // Simulate progress
      toast.success(response?.message || 'Data collection started successfully!');
      localStorage.setItem('collectedData', JSON.stringify(response.data)); // Store collected data in localStorage
    } catch (error) {
      setCollectDataProgress(false);
      console.error('Error collecting data:', error);
      toast.error(error?.message || 'Data collection failed. Please try again.');
    }
  };

  useEffect(() => {
    const routeData = localStorage.getItem('selectedRoute');
    if (routeData) {
      setRoute(JSON.parse(routeData));
      // console.log('Route Data from URL:', JSON.parse(routeData));
    }
    const isUserExists = localStorage.getItem('user') || sessionStorage.getItem('user');
    const parsedUser = isUserExists ? JSON.parse(isUserExists) : null;
    // console.log(parsedUser?.user, 'profile');
    setUserData(parsedUser);
  }, [collectDataProgress]);

  return (
    <Container className="my-1">
      <Card className="shadow-sm border-0 rounded">
        <Card.Header className="bg-brand-color-1 text-white d-flex align-items-center">
          <FaUpload className="me-2" />
          <strong>Upload Route CSV</strong>
        </Card.Header>

        <Card.Body
          className="text-center border border-dashed rounded m-3 mb-0 p-5"
          style={{ borderColor: '#d3d3d3', borderStyle: 'dashed' }}
        >
          {/* Hidden file input */}
          <input type="file" id="file-upload" accept=".csv" onChange={handleUpload} style={{ display: 'none' }} />

          {/* Clickable upload area */}
          <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
            <FaUpload size={40} color="#d3d3d3" />
            <h4 className="mt-3">Drag & Drop CSV File or Click to Browse</h4>
            <p className="text-muted">Upload CSV file with latitude, longitude coordinates</p>
          </label>

          {/* <Row className="justify-content-center mt-4">
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
          </Row> */}
          {data && (
            <>
              <Row className="mt-3">
                <Col className="justify-content-center text-center">
                  <h4>
                    Route Id: <span className="text-primary">{data?.route?.routeId}</span>
                  </h4>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col className="justify-content-center text-center">
                  {collectDataProgress == false ? (
                    <Button variant="info" onClick={() => handleCollectData()} className="shadow">
                      Collect Data
                    </Button>
                  ) : (
                    <>
                      <Row className="mt-3 justify-content-center">
                        <Col style={{ justifyContent: 'center', display: 'flex' }}>
                          <ProgressBar
                            animated
                            striped
                            now={100}
                            label="In Progress"
                            style={{ height: '2rem', width: '30%', fontSize: '1rem' }}
                            variant="primary"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Timeout isRunning={collectDataProgress == true ? true : false} />
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
      </Card>
      {data && (
        <>
          <Row className="mt-4">
            <Col className="">
              <h4>Next steps: </h4>
              <ul className="list-unstyled">
                {data?.nextSteps?.map((step, index) => (
                  <li key={index} className="text-muted">
                    {index + 1}. {step}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default UploadRouteCSV;
