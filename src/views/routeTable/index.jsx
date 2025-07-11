// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from 'components/MainCard';

// assets
import Image1 from 'assets/images/user/avatar-1.png';
import Image2 from 'assets/images/user/avatar-2.png';
import Image3 from 'assets/images/user/avatar-3.png';
import { useNavigate } from 'react-router-dom';
import apiService from '../../utils/ApiService';

// ===============================|| RECENT USERS CARD - DATA ||============================== //

const routeData = [
  {
    id: 1,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041000112',
    customer_name: 'BAJAJ MOTOR',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 2,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002363',
    customer_name: 'MS/HSD SHRI JAMBHESHWAR AUTOCARE',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 3,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002365',
    customer_name: 'SRI GAYATRI FILLING CENTRE',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 4,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002367',
    customer_name: 'MS HSD HAMARA PUMP GURANA UJJAWAL',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 5,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002371',
    customer_name: 'SHIV KAILASH FUEL POINT',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 6,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002376',
    customer_name: 'HAMARA PUMP GANPATI FUEL SORON',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 7,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002378',
    customer_name: 'MS/HSD HAMARA PUMP SAFIYABAD LOTI',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 8,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002382',
    customer_name: 'SHRI SAI HP',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 9,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002385',
    customer_name: 'ADHIRAJ HP',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 10,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002388',
    customer_name: 'QUALITY FUELS',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 11,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002396',
    customer_name: 'MS/HSD HIGHWAY PETROCAR',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 12,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002406',
    customer_name: 'PATHED AUTO FUELS',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 13,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002419',
    customer_name: 'KALSIYA FILLING STATION',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 14,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002424',
    customer_name: 'SONY FILLING STATION',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 15,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002439',
    customer_name: 'MADHAV FILLING STATION',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 16,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002447',
    customer_name: 'SURABHI AUTOMOBILES',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 17,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002460',
    customer_name: 'A.S. HP FILLING STATION',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 18,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002464',
    customer_name: 'MS/HSD D V Fuels',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 19,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002472',
    customer_name: 'HAYAT FILLING STATION',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 20,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002481',
    customer_name: 'IMDAD HP FILLING STATION',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 21,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002486',
    customer_name: 'MS/HSD D.R. SHARMA FUEL CENTRE',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 22,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002490',
    customer_name: 'SHRI NANAK HP FILLING STATION',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 23,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041002498',
    customer_name: 'MAHADEV FILLING STATION HP',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 24,
    bu_code: '1146',
    location: 'MEERUT DEPOT',
    row_labels: '0041025372',
    customer_name: 'MOTI FILLING STATION',
    badge1: 'Reject',
    badge2: 'Get Route'
  }
];

// ==========================|| RECENT USERS CARD ||========================== //

export default function RouteTable() {
  const navigate = useNavigate();

  const handleRoute = (route) => {
    // Navigate to the route analysis page with the selected route ID
    navigate(`/route-analysis/${route.id}`);
    localStorage.setItem('selectedRoute', JSON.stringify(route));
  };

  return (
    <MainCard title="Recent Users" className="Recent-Users table-card">
      <Table responsive hover className="mb-0">
        <tbody>
          {routeData.map((route, index) => (
            <tr key={index}>
              <td>
                <h6 className="mb-1">{route.id}</h6>
              </td>
              <td>
                <p className="m-0">{route.bu_code}</p>
              </td>
              <td>
                <h6 className="mb-1">{route.location}</h6>
              </td>
              <td>
                {/* <i className={`ti ti-circle-filled f-10 ${route.iconClass}`} /> */}
                {route.row_labels}
              </td>
              <td>{route.customer_name}</td>
              <td>
                {/* <Badge bg="brand-color-2" className="me-2 f-12">
                  {route.badge1}
                </Badge> */}
                <Badge bg="brand-color-1" className="me-2 f-12" style={{ cursor: 'pointer' }} onClick={() => handleRoute(route)}>
                  {route.badge2}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
