import React, { useState, useEffect } from 'react';

const tableSchemas = {
  personal_info: [
    { name: 'full_name', type: 'text', label: 'Full Name', required: true },
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'bio', type: 'textarea', label: 'Bio' },
    { name: 'profile_image', type: 'text', label: 'Profile Image URL' },
    { name: 'location', type: 'text', label: 'Location' },
  ],
  experience: [
    { name: 'title', type: 'text', label: 'Title', required: true },
    { name: 'company', type: 'text', label: 'Company' },
    { name: 'start_date', type: 'date', label: 'Start Date' },
    { name: 'end_date', type: 'date', label: 'End Date' },
    { name: 'description', type: 'textarea', label: 'Description' },
    { name: 'logo', type: 'text', label: 'Company Logo URL' },
  ],
  projects: [
    { name: 'title', type: 'text', label: 'Title', required: true },
    { name: 'description', type: 'textarea', label: 'Description' },
    { name: 'link_demo', type: 'text', label: 'Demo Link' },
    { name: 'link_repo', type: 'text', label: 'Repo Link' },
    { name: 'image', type: 'text', label: 'Image URL' },
    { name: 'tech_stack', type: 'array', label: 'Tech Stack (comma-separated)' },
    { name: 'status', type: 'text', label: 'Status' },
  ],
  skills: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'type', type: 'text', label: 'Type' },
    { name: 'level', type: 'number', label: 'Level' },
    { name: 'icon', type: 'text', label: 'Icon URL' },
  ],
  social_links: [
    { name: 'type', type: 'text', label: 'Type', required: true },
    { name: 'url', type: 'text', label: 'URL', required: true },
  ],
  testimonials: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'role', type: 'text', label: 'Role' },
    { name: 'company', type: 'text', label: 'Company' },
    { name: 'message', type: 'textarea', label: 'Message' },
    { name: 'photo', type: 'text', label: 'Photo URL' },
  ],
};

const DevModePanel = ({ onClose, authToken }) => {
  const [activeTab, setActiveTab] = useState('personal_info');

  const callApi = async (method, endpoint, body = null) => {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (authToken) {
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }
    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`http://localhost:3000/api/data/${endpoint}`, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${endpoint}): ${response.status} ${response.statusText} - ${errorText}`);
    }
    return response.json();
  };

  const CrudTableEditor = ({ tableName }) => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetchItems();
    }, [tableName]);

    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await callApi('GET', tableName);
        setItems(data);
      } catch (e) {
        setError(e);
        console.error(`Error fetching ${tableName}:`, e);
      } finally {
        setLoading(false);
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      // Special handling for array type (e.g., tech_stack)
      if (tableSchemas[tableName].find(field => field.name === name)?.type === 'array') {
        setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()) });
      } else if (tableSchemas[tableName].find(field => field.name === name)?.type === 'number') {
        setFormData({ ...formData, [name]: Number(value) });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

    const handleAddItem = () => {
      setIsEditing(true);
      setEditingItemId(null);
      // Initialize formData with empty values based on schema
      const initialFormData = {};
      tableSchemas[tableName].forEach(field => {
        initialFormData[field.name] = field.type === 'array' ? [] : '';
      });
      setFormData(initialFormData);
    };

    const handleEditItem = (item) => {
      setIsEditing(true);
      setEditingItemId(item.id);
      // Special handling for array type when populating form
      const itemToEdit = { ...item };
      tableSchemas[tableName].forEach(field => {
        if (field.type === 'array' && Array.isArray(itemToEdit[field.name])) {
          itemToEdit[field.name] = itemToEdit[field.name].join(', ');
        }
      });
      setFormData(itemToEdit); // Populate form with item data
    };

    const handleDeleteItem = async (id) => {
      if (window.confirm(`Are you sure you want to delete item ${id} from ${tableName}?`)) {
        setLoading(true);
        setError(null);
        try {
          await callApi('DELETE', `${tableName}/${id}`);
          alert('Item deleted successfully!');
          fetchItems(); // Refresh list
        } catch (e) {
          setError(e);
          console.error(`Error deleting ${tableName} item:`, e);
          alert('Error deleting item: ' + e.message);
        } finally {
          setLoading(false);
        }
      }
    };

    const handleSaveItem = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      try {
        if (isEditing && editingItemId) {
          await callApi('PUT', `${tableName}/${editingItemId}`, formData);
          alert('Item updated successfully!');
        } else {
          await callApi('POST', tableName, formData);
          alert('Item added successfully!');
        }
        setIsEditing(false);
        setEditingItemId(null);
        setFormData({});
        fetchItems(); // Refresh list
      } catch (e) {
        setError(e);
        console.error(`Error saving ${tableName} item:`, e);
        alert('Error saving item: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    const renderFormFields = () => {
      const schema = tableSchemas[tableName];
      if (!schema) return <p className="text-red-500">Schema not found for {tableName}.</p>;

      return schema.map(field => {
        const commonProps = {
          name: field.name,
          value: formData[field.name] || '',
          onChange: handleInputChange,
          className: "w-full p-2 mb-2 bg-gray-800 text-green-200 rounded font-mono focus:outline-none focus:border-green-500",
        };

        let inputElement;
        switch (field.type) {
          case 'textarea':
            inputElement = <textarea {...commonProps} rows="4"></textarea>;
            break;
          case 'date':
            // Ensure date is formatted correctly for input type="date"
            const dateValue = formData[field.name] ? new Date(formData[field.name]).toISOString().split('T')[0] : '';
            inputElement = <input type="date" {...commonProps} value={dateValue} />;
            break;
          case 'number':
            inputElement = <input type="number" {...commonProps} />;
            break;
          case 'array':
            // For array, display as comma-separated string in a text input
            inputElement = <input type="text" {...commonProps} placeholder="Comma-separated values" />;
            break;
          default:
            inputElement = <input type="text" {...commonProps} />;
        }

        return (
          <div key={field.name} className="mb-4">
            <label className="block text-green-200 text-sm mb-1">
              {field.label || field.name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {inputElement}
          </div>
        );
      });
    };

    if (loading) return <p className="text-green-400">Loading {tableName}...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
      <div className="p-4 bg-gray-900 rounded">
        <h3 className="text-xl text-green-300 mb-4">Manage {tableName.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</h3>

        {!isEditing && (
          <button onClick={handleAddItem} className="mb-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-500">
            Add New {tableName.slice(0, -1).replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
          </button>
        )}

        {isEditing && (
          <form onSubmit={handleSaveItem} className="mb-4 p-4 border border-green-700 rounded">
            <h4 className="text-lg text-green-300 mb-2">{editingItemId ? 'Edit' : 'Add'} Item</h4>
            {renderFormFields()}
            <div className="flex justify-end space-x-2 mt-4">
              <button type="submit" className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-500">
                Save
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </form>
        )}

        {!isEditing && items.length > 0 && (
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="bg-gray-800 p-3 rounded flex justify-between items-center">
                <span className="text-green-200">{item.full_name || item.title || item.name || item.message || JSON.stringify(item)}</span>
                <div>
                  <button onClick={() => handleEditItem(item)} className="px-3 py-1 bg-yellow-700 text-white rounded hover:bg-yellow-500 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteItem(item.id)} className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-500">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isEditing && items.length === 0 && <p className="text-gray-400">No items to display.</p>}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-green-400">Dev Mode Panel</h2>
        <button onClick={onClose} className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-500">
          Close
        </button>
      </div>

      <div className="flex mb-4 border-b border-green-700 overflow-x-auto pb-2">
        {[ 'personal_info', 'experience', 'projects', 'skills', 'social_links', 'testimonials'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 text-lg font-semibold whitespace-nowrap ${activeTab === tab ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="flex-grow">
        <CrudTableEditor tableName={activeTab} />
      </div>
    </div>
  );
};

export default DevModePanel;