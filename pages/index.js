import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [format, setFormat] = useState('tweet');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const repurpose = async () => {
    setLoading(true);
    setResult('');

    const res = await fetch('/api/repurpose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, format })
    });

    const data = await res.json();
    if (data.result) setResult(data.result);
    else setResult(`Error: ${data.error}`);

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1>AI Content Repurposer</h1>
      <textarea
        rows="5"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your content here"
        style={{ width: '100%', padding: '10px' }}
      />
      <br />
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="tweet">Tweet</option>
        <option value="LinkedIn post">LinkedIn Post</option>
        <option value="YouTube script">YouTube Script</option>
        <option value="TikTok hook">TikTok Hook</option>
      </select>
      <br /><br />
      <button onClick={repurpose} disabled={loading}>
        {loading ? "Repurposing..." : "Repurpose"}
      </button>

      {result && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h3>Output:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}