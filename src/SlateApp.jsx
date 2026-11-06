import React, { useState, useEffect } from 'react';


const API_URL = 'https://cld-bckend.summatryaws.workers.dev';

export default function SlateApp() {
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  // App load agum pothu backend-la irundhu items-a fetch panrom
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/items`);
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Item add panra function (POST request)
  const handleAdd = async () => {
    if (inputText.trim() === '') return;
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText.trim() }),
      });
      const data = await response.json();
      if (data.success) {
        setDataList(data.items);
        setInputText('');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Item delete panra function (DELETE request)
  const handleDelete = async (indexToDelete) => {
    try {
      const response = await fetch(`${API_URL}/items/${indexToDelete}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setDataList(data.items);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Search filter logic
  const filteredList = dataList.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Testing Console</h1>
        <p style={styles.subtitle}>dummy test for leearn app list</p>
      </header>

      <main style={styles.card}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Type something to test..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            style={styles.input}
          />
          <button onClick={handleAdd} style={styles.button}>
            Add Item
          </button>
        </div>

        {dataList.length > 0 && (
          <div style={styles.searchGroup}>
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        )}

        <div style={styles.listSection}>
          <div style={styles.listHeaderRow}>
            <h3 style={styles.listTitle}>
              Backend Data List ({filteredList.length}/{dataList.length}):
            </h3>
          </div>

          {loading ? (
            <p style={styles.emptyText}>Loading from backend...</p>
          ) : filteredList.length === 0 ? (
            <p style={styles.emptyText}>
              {dataList.length === 0 ? 'No items in backend yet.' : 'No matching items found.'}
            </p>
          ) : (
            <ul style={styles.list}>
              {filteredList.map((item, index) => (
                <li key={index} style={styles.listItem}>
                  <span style={styles.itemText}>{item}</span>
                  <button 
                    onClick={() => handleDelete(dataList.indexOf(item))} 
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
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
    marginBottom: '15px',
  },
  searchGroup: {
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
  searchInput: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '13px',
    outline: 'none',
    backgroundColor: '#f8fafc',
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
  listHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  listTitle: {
    fontSize: '16px',
    color: '#2d3748',
    margin: 0,
  },
  emptyText: {
    color: '#a0aec0',
    fontSize: '14px',
    textAlign: 'center',
    padding: '10px 0',
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: '#334155',
    fontSize: '14px',
    wordBreak: 'break-all',
    paddingRight: '10px',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 10px',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    flexShrink: 0,
  },
};