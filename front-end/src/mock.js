import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

let items = [
    { id: 1, name: 'Item 1', description: 'Description 1', price: 10.0, quantity: 100 },
    { id: 2, name: 'Item 2', description: 'Description 2', price: 20.0, quantity: 200 },
    { id: 3, name: 'Item 3', description: 'Description 3', price: 30.0, quantity: 300 },
];

mock.onGet('/api/items').reply(200, items);
mock.onPost('/api/items').reply((config) => {
    const newItem = JSON.parse(config.data);
    newItem.id = items.length + 1;
    items.push(newItem);
    return [200, newItem];
});
mock.onPut(/\/api\/items\/\d+/).reply((config) => {
    const id = parseInt(config.url.split('/').pop());
    const updatedItem = JSON.parse(config.data);
    items = items.map((item) => (item.id === id ? updatedItem : item));
    return [200, updatedItem];
});
mock.onDelete(/\/api\/items\/\d+/).reply((config) => {
    const id = parseInt(config.url.split('/').pop());
    items = items.filter((item) => item.id !== id);
    return [200];
});

export default mock;
