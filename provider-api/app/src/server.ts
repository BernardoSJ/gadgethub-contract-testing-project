import express from "express";

const app = express();
app.use(express.json());

type Gadget = { id: number; name: string; description?: string };

const gadgets: Gadget[] = [
  { id: 1, name: "Smartphone", description: "High-end phone" },
  { id: 2, name: "Laptop", description: "Ultrabook" }
];

// GET /gadgets
app.get("/gadgets", (_req, res) => {
  res.status(200).json(gadgets);
});

// GET /gadgets/{id}
app.get("/gadgets/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = gadgets.find(g => g.id === id);

  if (!found) {
    return res.status(404).json({ message: "Gadget not found" });
  }

  res.status(200).json(found);
});

// POST /gadgets
let nextId = 3;
app.post("/gadgets", (req, res) => {
  const { name, description } = req.body ?? {};
  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Invalid request" });
  }
  
  const newGadget: Gadget = { id: nextId++, name, description };
  gadgets.push(newGadget);
  res.status(201).json(newGadget);
});

const port = process.env.PORT ? Number(process.env.PORT) : 9001;
app.listen(port, () => console.log(`Provider running on http://localhost:${port}`));
