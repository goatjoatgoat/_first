// 임시 인메모리 데이터 (나중에 DB로 교체)
let items = [
  { id: 1, name: 'Item 1', description: '첫 번째 아이템' },
  { id: 2, name: 'Item 2', description: '두 번째 아이템' },
];
let nextId = 3;

// GET /api/items
const getAll = (req, res) => {
  res.json(items);
};

// GET /api/items/:id
const getOne = (req, res) => {
  const item = items.find((i) => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

// POST /api/items
const create = (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'name is required' });

  const newItem = { id: nextId++, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
};

// PUT /api/items/:id
const update = (req, res) => {
  const index = items.findIndex((i) => i.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  items[index] = { ...items[index], ...req.body, id: items[index].id };
  res.json(items[index]);
};

// DELETE /api/items/:id
const remove = (req, res) => {
  const index = items.findIndex((i) => i.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  items.splice(index, 1);
  res.status(204).send();
};

module.exports = { getAll, getOne, create, update, remove };
