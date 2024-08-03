import React from 'react';

const ItemList = ({ items, onDelete, onEdit }) => {
    return (
        <div>
            <h2>Items</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.description} - ${item.price} - {item.quantity}
                        <button onClick={() => onEdit(item)}>Edit</button>
                        <button onClick={() => onDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
