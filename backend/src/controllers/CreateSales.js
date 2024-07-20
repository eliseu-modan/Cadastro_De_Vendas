const prisma = require('../importPrisma'); 
const { createUser } = prisma; 

let userId;

exports.AssociationMessageId = function (userIdParam) {
  userId = userIdParam;
};

function formatDate(date) {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, '0');
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); 
  const year = formattedDate.getFullYear().toString().slice(-2); 

  return `${day}/${month}/${year}`;
}

exports.createSales = async (req, res) => {
  try {
    const { name, date, quantity, monthlyTarget } = req.body;

    const identifySeller = await createUser.findMany({
      where: {
        id: userId,
      },
    });
   let nameProduct;
   let code;


    if (typeof name === 'string') {
      const dashIndex = name.indexOf('-');
  if (dashIndex !== -1) {
   nameProduct = name.substring(0, dashIndex).trim(); 
   code = name.substring(dashIndex + 1).trim();
  }
}
if (identifySeller.length > 0) {
      const emailSeller = identifySeller[0].email;
      const seller = emailSeller.split('@')[0];
      const datas = await prisma.registerSales.create({
        data: {
          name: nameProduct,
          date: date,
          quantity: quantity,
          monthlyTarget: monthlyTarget,
          seller: seller,
          code:code,
          userId: userId
        }
      });
      res.status(201).json({ message: 'Product created successfully', data: datas });
    } else {
      console.log("Usuário não encontrado");
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error("Erro ao criar Product:", error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};


exports.getSalesLists = async (req, res)=>{
  try {
    const getSales = await prisma.registerSales.findMany({
      where: {
        userId: userId,
      },
    });
    if (getSales.length > 0) {
      const formattedSales = getSales.map(sale => ({
        ...sale,
        date: formatDate(sale.date), 
      }));

      res.json(formattedSales);

    }
  } catch (error) {
    console.error("Erro ao buscar tarefas concluídas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

exports.editSales = async (req, res) => {
  try {
    const taskId = req.params.id;
    const editSales = req.body;
    const id = parseInt(taskId, 10);
    
    editSales.quantity = parseInt(editSales.quantity, 10);
    editSales.monthlyTarget = parseInt(editSales.monthlyTarget, 10);
    const updatedTask = await prisma.registerSales.update({
      where: { id: id },
      data: editSales,
    });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a tarefa" });
  }
};

exports.deleteSales = async (req, res) => {
  try {
    const taskId = req.params.data;
    const id = parseInt(taskId, 10);
   await prisma.registerSales.delete({
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