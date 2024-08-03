import React, { useState, useEffect } from 'react';

const ItemForm = ({ onSave, item, onUpdate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description);
            setPrice(item.price);
            setQuantity(item.quantity);
        }
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = { name, description, price, quantity };

        if (item) {
            onUpdate({ ...newItem, id: item.id });
        } else {
            onSave(newItem);
        }

        setName('');
        setDescription('');
        setPrice(0);
        setQuantity(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    required
                />
            </div>
            <div>
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    required
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default ItemForm;
