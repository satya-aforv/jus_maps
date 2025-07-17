import { useParams } from 'react-router-dom';

export default function RouteInfo() {
  const { row_labels } = useParams();

  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h2>Route Information</h2>
      <div style={{ margin: '24px 0' }}>
        <a
          href={`https://your-web-link.com/${row_labels}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: 24, fontSize: 18 }}
        >
          Open Web Link
        </a>
        <a href={`/pdfs/${row_labels}.pdf`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 18 }}>
          Download PDF
        </a>
      </div>
    </div>
  );
}
