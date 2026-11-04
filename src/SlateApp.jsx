import React, { useState } from 'react';

export default function SlateApp() {
  const [inputText, setInputText] = useState('');
  const [dataList, setDataList] = useState([]);

  const handleAdd = () => {
    if (inputText.trim() === '') return;
    setDataList([...dataList, inputText]);
    setInputText('');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Zoho Slate Testing Console</h1>
        <p style={styles.subtitle}>React Frontend UI for Catalyst Testing</p>
      </header>

      <main style={styles.card}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Type something to test..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAdd} style={styles.button}>
            Add Item
          </button>
        </div>

        <div style={styles.listSection}>
          <h3 style={styles.listTitle}>Test Data List:</h3>
          {dataList.length === 0 ? (
            <p style={styles.emptyText}>No items added yet.</p>
          ) : (
            <ul style={styles.list}>
              {dataList.map((item, index) => (
                <li key={index} style={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f4f5f7',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    color: '#1a202c',
    fontSize: '28px',
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#718096',
    fontSize: '15px',
    margin: 0,
  },
  card: {
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 18px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  listSection: {
    borderTop: '1px solid #edf2f7',
    paddingTop: '16px',
  },
  listTitle: {
    fontSize: '16px',
    color: '#2d3748',
    marginBottom: '12px',
  },
  emptyText: {
    color: '#a0aec0',
    fontSize: '14px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    backgroundColor: '#f8fafc',
    padding: '10px 12px',
    borderRadius: '6px',
    marginBottom: '8px',
    border: '1px solid #e2e8f0',
    color: '#334155',
  },
};