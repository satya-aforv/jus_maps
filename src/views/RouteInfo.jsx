import { useParams } from 'react-router-dom';

export default function RouteInfo() {
  const { row_labels } = useParams();

  return (
    <div style={{ padding: 32, textAlign: 'center', justifyContent: 'center', marginTop: '10rem' }}>
      <h2>Route Information</h2>
      <div style={{ margin: '24px 0' }}>
        <a href={`http://69.62.73.201:5099/login`} target="_blank" rel="noopener noreferrer" style={{ marginRight: 24, fontSize: 18 }}>
          Open Web Link
        </a>
        <a href={`/pdfs/Complete_Route_Analysi_04-07-25.pdf`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 18 }}>
          Download PDF
        </a>
      </div>
    </div>
  );
}
