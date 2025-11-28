import React, { useState } from "react";
import './App.css';
 
export default function BankPortal({ baseUrl = "http://localhost:8051/api" }) {
  const [activeTab, setActiveTab] = useState("create");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
 
  const [create, setCreate] = useState({ FullName: "", dateOfBirth: "", mobileNumber: "", bankName: "", email: "", address: "", adharNumber: "" });
  const [searchAccount, setSearchAccount] = useState("");
  const [fetched, setFetched] = useState(null);
  const [update, setUpdate] = useState({ accountNumber: "", FULLNAME: "", ADDRESS: "", MOBILENUMBER: "" });
  const [deleteAccountId, setDeleteAccountId] = useState("");
 
  const resetMessages = () => { setMessage(null); setError(null); };
 
  async function safeFetch(url, opts = {}){
    setLoading(true); resetMessages();
    try{
      const res = await fetch(url, opts);
      const text = await res.text();
      let json;
      try { json = text ? JSON.parse(text) : null; } catch(e){ json = { raw: text }; }
      if(!res.ok) throw { status: res.status, body: json };
      return json;
    } finally { setLoading(false); }
  }
 
  // ... keep your handleCreate, handleGet, handleUpdate, handleDelete unchanged ...
 
  const tabs = [
    { id: "create", label: "Create Account" },
    { id: "fetch", label: "Fetch Account" },
    { id: "update", label: "Update Account" },
    { id: "delete", label: "Deactivate Account" },
  ];
 
  return (
    <div className="container">
      <header>
        <h1>Bank Account — Admin Portal</h1>
        <p>Create, fetch, update or deactivate customer accounts</p>
      </header>
 
      {(message || error) && (
        <div className={`notification ${error ? 'error' : 'success'}`}>
          <strong>{error ? 'Error: ' : 'Success: '}</strong>
          <span>{error || message}</span>
        </div>
      )}
 
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => { setActiveTab(tab.id); resetMessages(); }}
          >
            {tab.label}
          </button>
        ))}
      </div>
 
      <div className="tab-content">
        {activeTab === "create" && (
          <form className="box" onSubmit={handleCreate}>
            <input value={create.FullName} onChange={e => setCreate({...create, FullName: e.target.value})} placeholder="Full name" required />
            <input value={create.dateOfBirth} onChange={e => setCreate({...create, dateOfBirth: e.target.value})} type="date" required />
            <input value={create.mobileNumber} onChange={e => setCreate({...create, mobileNumber: e.target.value})} placeholder="Mobile number" required />
            <input value={create.adharNumber} onChange={e => setCreate({...create, adharNumber: e.target.value})} placeholder="Aadhar number (optional)" />
            <input value={create.bankName} onChange={e => setCreate({...create, bankName: e.target.value})} placeholder="Bank name" required />
            <input value={create.email} onChange={e => setCreate({...create, email: e.target.value})} placeholder="Email" required />
            <input value={create.address} onChange={e => setCreate({...create, address: e.target.value})} placeholder="Address" required />
            <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
          </form>
        )}
 
        {activeTab === "fetch" && (
          <div className="box">
            <input value={searchAccount} onChange={e => setSearchAccount(e.target.value)} placeholder="Account number" />
            <button onClick={handleGet}>Fetch</button>
            {fetched && <pre>{JSON.stringify(fetched, null, 2)}</pre>}
          </div>
        )}
 
        {activeTab === "update" && (
          <form className="box" onSubmit={handleUpdate}>
            <input value={update.accountNumber} onChange={e => setUpdate({...update, accountNumber: e.target.value})} placeholder="Account number" required />
            <input value={update.FULLNAME} onChange={e => setUpdate({...update, FULLNAME: e.target.value})} placeholder="Full name (optional)" />
            <input value={update.ADDRESS} onChange={e => setUpdate({...update, ADDRESS: e.target.value})} placeholder="Address (optional)" />
            <input value={update.MOBILENUMBER} onChange={e => setUpdate({...update, MOBILENUMBER: e.target.value})} placeholder="Mobile (optional)" />
            <button type="submit">{loading ? 'Updating...' : 'Update'}</button>
          </form>
        )}
 
        {activeTab === "delete" && (
          <div className="box">
            <input value={deleteAccountId} onChange={e => setDeleteAccountId(e.target.value)} placeholder="Account number" />
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
 
      <footer>Tip: ensure your Mule API is running and CORS is enabled for this UI to call it from browser.</footer>
    </div>
  );
}
 
