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

exports.dashboardData = async (req, res)=>{
  try {
    const { product, date } = req.body;  // date é esperado como [2024]
    let name;
    let codee;
    let getSalesData
 
    if (typeof product === 'string') {
      const dashIndex = product.indexOf('-');
      if (dashIndex !== -1) {
        name = product.substring(0, dashIndex).trim();
        codee = product.substring(dashIndex + 1).trim();
      }
    }
    let dateString;
    if (date && Array.isArray(date) && date.length > 0) {
      dateString = date[0].toString();  // '2024'
    }
   
    if (name && codee && dateString) {
      getSalesData = await prisma.registerSales.findMany({
        where: {
          userId: userId,
          name: name,
          code: codee,
          date: {
            contains: dateString,
          }
        }
      });
      
    }
    const monthlyQuantities = Array(12).fill(0);

    if(getSalesData){

      getSalesData.forEach(item => {
        const date = new Date(item.date);
        const month = date.getMonth(); 
        if (month >= 0 && month < 12) {
          monthlyQuantities[month] += item.quantity; 
        }
      });
    }
      
    console.log("get sales data" , monthlyQuantities)
    res.status(200).json(monthlyQuantities);
  }
  
   catch (error) {
    console.error("Erro ao buscar tarefas concluídas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
