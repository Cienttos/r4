import React, { useState, useEffect, useRef } from 'react';
import Snackbar from './Snackbar';
import Modal from './Modal';

const tableSchemas = {
  personal_info: [
    { name: 'full_name', type: 'text', label: 'Nombre Completo', required: true },
    { name: 'title', type: 'text', label: 'Título' },
    { name: 'bio', type: 'textarea', label: 'Biografía' },
    { name: 'profile_image', type: 'text', label: 'URL de Imagen de Perfil' },
    { name: 'location', type: 'text', label: 'Ubicación' },
  ],
  experience: [
    { name: 'title', type: 'text', label: 'Título', required: true },
    { name: 'company', type: 'text', label: 'Empresa' },
    { name: 'start_date', type: 'date', label: 'Fecha de Inicio' },
    { name: 'end_date', type: 'date', label: 'Fecha de Finalización' },
    { name: 'description', type: 'textarea', label: 'Descripción' },
    { name: 'logo', type: 'text', label: 'URL del Logo de la Empresa' },
  ],
  projects: [
    { name: 'title', type: 'text', label: 'Título', required: true },
    { name: 'description', type: 'textarea', label: 'Descripción' },
    { name: 'link_demo', type: 'text', label: 'Enlace de Demostración' },
    { name: 'link_repo', type: 'text', label: 'Enlace del Repositorio' },
    { name: 'image', type: 'text', label: 'URL de Imagen' },
    { name: 'tech_stack', type: 'array', label: 'Tecnologías (separadas por comas)' },
    { name: 'status', type: 'text', label: 'Estado' },
  ],
  skills: [
    { name: 'name', type: 'text', label: 'Nombre', required: true },
    { name: 'type', type: 'text', label: 'Tipo' },
    { name: 'level', type: 'number', label: 'Nivel' },
    { name: 'icon', type: 'text', label: 'URL del Ícono' },
  ],
  social_links: [
    { name: 'type', type: 'text', label: 'Tipo', required: true },
    { name: 'url', type: 'text', label: 'URL', required: true },
  ],
  testimonials: [
    { name: 'name', type: 'text', label: 'Nombre', required: true },
    { name: 'role', type: 'text', label: 'Rol' },
    { name: 'company', type: 'text', label: 'Empresa' },
    { name: 'message', type: 'textarea', label: 'Mensaje' },
    { name: 'photo', type: 'text', label: 'URL de Foto' },
  ],
};

const DevModePanel = ({ onClose, authToken, onLogout }) => {
  const [activeTab, setActiveTab] = useState('personal_info');
  const snackbarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const crudTableEditorRef = useRef(null);

  const callApi = async (method, endpoint, body = null) => {
    const options = { method, headers: { 'Content-Type': 'application/json' } };
    if (authToken) options.headers['Authorization'] = `Bearer ${authToken}`;
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`https://r4-seven-one.vercel.app/api/data/${endpoint}`, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error de API (${endpoint}): ${response.status} ${response.statusText} - ${errorText}`);
    }
    if (response.status === 204) {
      return null;
    }
    return response.json();
  };

  const handleDeleteItem = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDeleteItem = async () => {
    if (!itemToDelete) return;
    try {
      await callApi('DELETE', `${activeTab}/${itemToDelete}`);
      snackbarRef.current.show('Elemento eliminado', 'success');
      if (crudTableEditorRef.current) {
        crudTableEditorRef.current.fetchItems();
      }
    } catch (e) {
      snackbarRef.current.show('Error: ' + e.message, 'error');
    } finally {
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const CrudTableEditor = React.forwardRef(({ tableName, onDeleteItem }, ref) => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await callApi('GET', tableName);
        setItems(data);
      } catch (e) {
        setError(e);
        console.error(e);
        snackbarRef.current.show('Error: ' + e.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    React.useImperativeHandle(ref, () => ({
      fetchItems,
    }));

    useEffect(() => {
      fetchItems();
    }, [tableName]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const fieldType = tableSchemas[tableName].find((f) => f.name === name)?.type;
      if (fieldType === 'array') {
        setFormData({ ...formData, [name]: value.split(',').map((v) => v.trim()) });
      } else if (fieldType === 'number') {
        setFormData({ ...formData, [name]: Number(value) });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

    const handleAddItem = () => {
      setIsEditing(true);
      setEditingItemId(null);
      const initialData = {};
      tableSchemas[tableName].forEach((f) => (initialData[f.name] = f.type === 'array' ? [] : ''));
      setFormData(initialData);
    };

    const handleEditItem = (item) => {
      setIsEditing(true);
      setEditingItemId(item.id);
      const itemCopy = { ...item };
      tableSchemas[tableName].forEach((f) => {
        if (f.type === 'array' && Array.isArray(itemCopy[f.name])) {
          itemCopy[f.name] = itemCopy[f.name].join(', ');
        }
      });
      setFormData(itemCopy);
    };

    const handleSaveItem = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      try {
        if (isEditing && editingItemId) {
          await callApi('PUT', `${tableName}/${editingItemId}`, formData);
        } else {
          await callApi('POST', tableName, formData);
        }
        snackbarRef.current.show('Guardado correctamente', 'success');
        setIsEditing(false);
        setEditingItemId(null);
        setFormData({});
        fetchItems();
      } catch (e) {
        setError(e);
        snackbarRef.current.show('Error: ' + e.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    const renderFormFields = () =>
      tableSchemas[tableName].map((field) => {
        const commonProps = { name: field.name, value: formData[field.name] || '', onChange: handleInputChange };
        let inputElement;
        switch (field.type) {
          case 'textarea':
            inputElement = <textarea {...commonProps} rows="4" className="bg-black/80 text-green-400 border border-green-500 p-2 rounded w-full focus:outline-none focus:border-green-400 placeholder-green-700"></textarea>;
            break;
          case 'date':
            inputElement = <input type="date" {...commonProps} value={formData[field.name] ? new Date(formData[field.name]).toISOString().split('T')[0] : ''} className="bg-black/80 text-green-400 border border-green-500 p-2 rounded w-full focus:outline-none focus:border-green-400 placeholder-green-700" />;
            break;
          case 'number':
            inputElement = <input type="number" {...commonProps} className="bg-black/80 text-green-400 border border-green-500 p-2 rounded w-full focus:outline-none focus:border-green-400 placeholder-green-700" />;
            break;
          case 'array':
            inputElement = <input type="text" {...commonProps} placeholder="Valores separados por comas" className="bg-black/80 text-green-400 border border-green-500 p-2 rounded w-full focus:outline-none focus:border-green-400 placeholder-green-700" />;
            break;
          default:
            inputElement = <input type="text" {...commonProps} className="bg-black/80 text-green-400 border border-green-500 p-2 rounded w-full focus:outline-none focus:border-green-400 placeholder-green-700" />;
        }
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-green-400 text-sm font-bold mb-2">
              {field.label || field.name}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {inputElement}
          </div>
        );
      });

    if (loading) return <p className="text-yellow-400">Cargando {tableName}...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
      <div className="bg-black/90 p-4 rounded-lg border border-green-500 mt-4 animate-fade-in-scale-up">
        <h3 className="text-green-500 text-lg sm:text-base mb-4">Administrar {tableName}</h3>

        {!isEditing && <button onClick={handleAddItem} className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded border border-green-500 mb-4 transition">Agregar {tableName}</button>}

        {isEditing && (
          <form onSubmit={handleSaveItem} className="mb-4">
            <h4 className="text-green-500 text-md mb-4">{editingItemId ? 'Editar' : 'Agregar'} elemento</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">{renderFormFields()}</div>
            <div>
              <button type="submit" className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded border border-green-500 mr-2 transition">Guardar</button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded border border-gray-500 transition">Cancelar</button>
            </div>
          </form>
        )}

        {!isEditing &&
          items.length > 0 &&
          items.map((item) => (
            <div key={item.id} className="bg-black/80 p-3 mb-2 rounded border border-green-500 flex justify-between items-center">
              <span className="text-green-300 sm:text-sm">{item.full_name || item.title || item.name || item.message || JSON.stringify(item)}</span>
              <div>
                <button onClick={() => handleEditItem(item)} className="bg-green-700 hover:bg-green-600 text-white py-1 px-2 rounded border border-green-500 text-sm ml-2 transition">Editar</button>
                <button onClick={() => onDeleteItem(item.id)} className="bg-red-700 hover:bg-red-600 text-white py-1 px-2 rounded border border-red-500 text-sm ml-2 transition">Eliminar</button>
              </div>
            </div>
          ))}
        {!isEditing && items.length === 0 && <p className="text-gray-500 mt-4">No hay elementos para mostrar.</p>}
      </div>
    );
  });

  return (
    <div className="bg-black/90 text-green-400 font-mono p-4 rounded-lg shadow-lg border border-green-500 w-11/12 md:w-3/4 lg:w-1/2 mx-auto my-8 animate-fade-in-scale-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-green-500 text-xl sm:text-lg">Panel de Modo Desarrollador</h2>
        <div>
          <button onClick={onClose} className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded border border-green-500 mr-2 transition">Cerrar</button>
          <button onClick={onLogout} className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded border border-green-500 transition">Cerrar sesión</button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap">
        {['personal_info', 'experience', 'projects', 'skills', 'social_links', 'testimonials'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-2 mb-2 py-2 px-4 rounded border border-green-500 transition ${activeTab === tab ? 'bg-green-500 text-black' : 'bg-green-700 hover:bg-green-600 text-white'} sm:text-sm`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div key={activeTab} className="transition-opacity duration-500 ease-in-out opacity-100">
        <CrudTableEditor ref={crudTableEditorRef} tableName={activeTab} onDeleteItem={handleDeleteItem} />
      </div>
      <Snackbar ref={snackbarRef} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDeleteItem} title="Confirmar Eliminación">
        <p>¿Estás seguro de que deseas eliminar este elemento?</p>
      </Modal>
    </div>
  );
};

export default DevModePanel;
