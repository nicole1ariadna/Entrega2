import { useState } from 'react';
import QrScanner from 'react-qr-scanner';

export default function QRScanner() {
  const [result, setResult] = useState('');

  const handleScan = (data) => {
    if (data) setResult(data.text || data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {result && (
        <div>
          <p>QR detectado:</p>
          <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
        </div>
      )}
    </div>
  );
}
