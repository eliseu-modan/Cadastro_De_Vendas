const e = require("cors");
const prisma = require("../importPrisma");
const io = require("socket.io")(6060, {
  cors: {
    origin: "*",
  },
});
let userId;
exports.AssociationMessageId = function (userIdParam) {
  userId = userIdParam;
};
exports.createProduct = async (req, res) => {
  try {
    const { name, price, code, Cor, Peso } = req.body;
    const user = userId; 
    const datas = await prisma.products.create({
      data: {
        name: name,
        price: price,
        code: code,
        Cor: Cor,
        Peso: Peso,
        userId: user
      }
    });
    
    res.status(201).json({ message: 'Product created successfully', data: datas });
  } catch (error) {
    console.log("Erro ao criar Product:", error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

exports.getProductsLists = async (req, res) => {
  try {
    const productsLists = await prisma.products.findMany({
      where:{
        userId:userId
      }
    });
    res.json(productsLists);
  } catch (error) {
    console.error("Erro ao buscar tarefas concluídas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};



exports.updateProduct = async (req, res) => {
  try {
    const taskId = req.params.id;
    const dataProduct = req.body;
    const id = parseInt(taskId, 10);
    console.log("id update",id)

    const updatedTask = await prisma.products.update({
      where: { id: id },
      data: dataProduct,
    });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a tarefa" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const taskId = req.params.data;
    const id = parseInt(taskId, 10);
    const deletetask = await prisma.products.delete({
      where: {
        id: id,
      },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover a tarefa:", error);
    res.status(500).send("Erro interno do servidor");
  }
};


