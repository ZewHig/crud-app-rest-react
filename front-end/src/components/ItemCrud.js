import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import ItemForm from './ItemForm';

const ItemCrud = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/items');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items', error);
        }
    };

    const addItem = async (item) => {
        try {
            await axios.post('http://localhost:8080/api/items', item);
            fetchItems();
        } catch (error) {
            console.error('Error adding item', error);
        }
    };

    const updateItem = async (item) => {
        try {
            await axios.put(`http://localhost:8080/api/items/${item.id}`, item);
            fetchItems();
        } catch (error) {
            console.error('Error updating item', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/items/${id}`);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item', error);
        }
    };

    return (
        <div className="container">
            <h1>Item CRUD</h1>
            <ItemForm onSave={addItem} item={selectedItem} onUpdate={updateItem} />
            <ItemList items={items} onDelete={deleteItem} onEdit={setSelectedItem} />
        </div>
    );
};

export default ItemCrud;
