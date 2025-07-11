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
    bu_code: '1527',
    location: 'Raipur Depot',
    row_labels: '0041000139',
    customer_name: 'G S BHATIA AND CO',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 2,
    bu_code: '1527',
    location: 'Raipur Depot',
    row_labels: '0041000154',
    customer_name: 'BALAJI SERVICE STATION',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 3,
    bu_code: '1527',
    location: 'Raipur Depot',
    row_labels: '0041001547',
    customer_name: 'NATIONAL MINERAL DEVELOPMENT',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 4,
    bu_code: '1527',
    location: 'Raipur Depot',
    row_labels: '0041001560',
    customer_name: 'NATIONAL MINERAL DEV CORPN LTD',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 5,
    bu_code: '1527',
    location: 'Raipur Depot',
    row_labels: '0041001652',
    customer_name: 'M/s-SECL, KUSMUNDA WORKSHOP-1',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 6,
    bu_code: '1527',
    location: 'Raipur Depot',
    row_labels: '0041007603',
    customer_name: 'KAMAL TRADING CO',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 7,
    bu_code: '1527',
    location: 'Raipur Depot',
    row_labels: '0041008073',
    customer_name: 'JAI PRAHALLAD PETROLEUM',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 8,
    bu_code: '1527',
    location: 'Raipur Depot',
    row_labels: '0041008075',
    customer_name: 'MANIRAM RAMNIWAS FUELS',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 9,
    bu_code: '1527',
    location: 'Raipur Depot',
    row_labels: '0041008079',
    customer_name: 'GIRISH FUELS',
    badge1: 'Reject',
    badge2: 'Get Route'
  },
  {
    id: 10,
    bu_code: '1527',
    location: 'Raipur Depot',
    row_labels: '0041008083',
    customer_name: 'MENDANI NETAM FUEL STATION',
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
