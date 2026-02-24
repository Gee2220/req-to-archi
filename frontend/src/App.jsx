import React, { useState } from 'react';
import axios from 'axios';

const ArchiCard = ({ title, icon, endpoint, requirement }) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!requirement) return alert("Please enter a project requirement first!");
    setLoading(true);
    setData(""); // Clear previous for better UX
    try {
      const res = await axios.post(`http://localhost:8000/generate/${endpoint}`, { requirement });
      setData(res.data.output);
    } catch (e) {
      setData("❌ Connection Error: Ensure FastAPI and Ollama are active.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.titleGroup}>
          <span style={styles.icon}>{icon}</span>
          <h3 style={styles.cardTitle}>{title}</h3>
        </div>
        <button 
          onClick={generate} 
          disabled={loading} 
          style={loading ? styles.btnLoading : styles.btn}
        >
          {loading ? (
            <span style={styles.loaderInline}></span>
          ) : "Analyze"}
        </button>
      </div>
      <div style={styles.contentArea}>
        {loading ? (
          <div style={styles.shimmer}>Ollama is reasoning...</div>
        ) : data ? (
          <pre style={styles.pre}>{data}</pre>
        ) : (
          <p style={styles.placeholder}>Awaiting requirement input...</p>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [requirement, setRequirement] = useState("");

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <header style={styles.header}>
          <h1 style={styles.mainTitle}>Archi<span style={styles.accent}>Gen</span></h1>
          <p style={styles.subtitle}>Requirement-to-Architecture Blueprint Generator</p>
        </header>

        <section style={styles.inputSection}>
          <div style={styles.inputWrapper}>
            <textarea 
              placeholder="Describe your software project (e.g., 'A decentralized voting app with real-time tallying')..."
              style={styles.textarea}
              onChange={(e) => setRequirement(e.target.value)}
            />
            <div style={styles.badge}>Local LLM Mode</div>
          </div>
        </section>

        <div style={styles.grid}>
          <ArchiCard title="System Architecture" icon="🏗️" endpoint="architecture" requirement={requirement} />
          <ArchiCard title="Database Schema" icon="💾" endpoint="database" requirement={requirement} />
          <ArchiCard title="API & Logic" icon="🔌" endpoint="api" requirement={requirement} />
          <ArchiCard title="Infrastructure (Terraform)" endpoint="infra" requirement={requirement} />
        </div>
        
        <footer style={styles.footer}>
          Powered by Ollama + LangChain Agents
        </footer>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontFamily: "'Inter', sans-serif",
    padding: '40px 20px',
  },
  header: { textAlign: 'center', marginBottom: '40px' },
  mainTitle: { fontSize: '3rem', margin: '0', fontWeight: '800', letterSpacing: '-1px' },
  accent: { color: '#38bdf8' },
  subtitle: { color: '#94a3b8', fontSize: '1.1rem' },
  inputSection: { maxWidth: '900px', margin: '0 auto 40px auto' },
  textarea: {
    width: '100%', height: '120px', backgroundColor: '#1e293b', border: '1px solid #334155',
    borderRadius: '12px', padding: '20px', color: '#f8fafc', fontSize: '1rem', outline: 'none',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', transition: 'border 0.3s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
  },
  cardHeader: {
    padding: '16px 20px', borderBottom: '1px solid #334155', display: 'flex',
    justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#33415544'
  },
  titleGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  cardTitle: { margin: 0, fontSize: '1rem', fontWeight: '600' },
  btn: {
    backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '8px 16px',
    borderRadius: '8px', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.2s'
  },
  contentArea: { padding: '20px', flexGrow: 1, minHeight: '200px' },
  pre: { 
    whiteSpace: 'pre-wrap', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6', 
    backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px' 
  },
  shimmer: { color: '#38bdf8', fontStyle: 'italic', animation: 'pulse 1.5s infinite' },
  placeholder: { color: '#64748b', textAlign: 'center', marginTop: '60px' },
  footer: { textAlign: 'center', marginTop: '60px', color: '#475569', fontSize: '0.8rem' }
};