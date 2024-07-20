import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Button,
  Row,
  Col,
  Input,
  Form,
  message,
  Empty,
} from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { useService } from "../../../contexts/service";
import { FormItem } from "../../_commons";

const SalesList = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const service = useService();
  const [dataSales, setDataSales] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });

  useEffect(() => {
    getSalesLists();
  }, []);

  async function getSalesLists() {
    setLoading(true);
    try {
      const { data } = await service.get("/sales/auth/getSalesLists");
      setDataSales(data);
      setPagination({ ...pagination, total: data.length });
    } catch (error) {
      console.log(error);
      message.error("Erro ao carregar as vendas.");
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    { key: "name", dataIndex: "name", title: "Descrição da Venda" },
    { key: "date", dataIndex: "date", title: "Data da venda" },
    {
      key: "quantity",
      title: "Quantidade",
      dataIndex: "quantity",
      align: "center",
    },
    {
      key: "seller",
      title: "Vendedor(a)",
      dataIndex: "seller",
      align: "center",
    },
    {
      key: "monthlyTarget",
      title: "Meta do mês",
      dataIndex: "monthlyTarget",
      align: "center",
    },
    { key: "code", title: "Código", dataIndex: "code", align: "center" },

    {
      key: "action",
      title: "Ação",
      align: "center",
      render: (data) => (
        <Row justify="left" gutter={24}>
          <Col>
            <Button
              icon={<EditOutlined />}
              type="link"
              onClick={() => handleEditClick(data)}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveClick(data)}
            />
          </Col>
        </Row>
      ),
    },
  ];

  function handleRemoveClick(data) {
    Modal.confirm({
      title: "Remover Tarefa",
      content: `Deseja realmente remover a Tarefa "${data.name}?"`,
      okText: "Remover",
      cancelText: "Cancelar",
      onOk: () => onRemoveProduct(data),
    });
  }

  async function onRemoveProduct(data) {
    try {
      await service.delete(`/sales/auth/deleteSales/${data.id}`);
      message.success("Venda removida com sucesso!");
      getSalesLists(); 
    } catch (error) {
      console.error(error);
      message.error("Erro ao remover a venda.");
    }
  }

  const handleEditClick = (data) => {
    form.setFieldsValue(data);
    setModalVisible(true);
  };

  async function onSubmitEdit(values) {
    setLoading(true);
    try {
      const response = await service.patch(
        `/sales/auth/editSales/${form.getFieldValue("id")}`,
        values
      );
      getSalesLists(); 
      setModalVisible(false);
      message.success("Venda atualizada com sucesso!");
    } catch (error) {
      console.error(error);
      message.error("Erro ao atualizar a venda.");
    } finally {
      setLoading(false);
    }
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  return (
    <>
      <div>
        {dataSales.length > 0 ? (
          <Table
            columns={columns}
            dataSource={dataSales}
            loading={loading}
            pagination={pagination}
            onChange={handleTableChange}
            rowKey="id"
          />
        ) : (
          <Empty description="Não há vendas registradas." />
        )}
        <Modal
          title="Editar Venda Realizada"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={onSubmitEdit} layout="vertical">
            <FormItem
              name="name"
              label="Descrição do Produto"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a descrição do produto.",
                },
              ]}
            >
              <Input />
            </FormItem>

            <FormItem
              name="date"
              label="Data da Venda"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecione a data da venda.",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </FormItem>

            <FormItem
              name="quantity"
              label="Quantidade"
              rules={[
                { required: true, message: "Por favor, insira a quantidade." },
                { message: "Quantidade inválida" },
              ]}
            >
              <Input />
            </FormItem>

            <FormItem
              name="seller"
              label="Vendedor(a)"
              rules={[
                { required: true, message: "Por favor, insira o vendedor(a)." },
              ]}
            >
              <Input disabled />
            </FormItem>

            <FormItem
              name="monthlyTarget"
              label="Meta do Mês"
              rules={[
                { required: true, message: "Por favor, insira a meta do mês." },
                { message: "Meta inválida" },
              ]}
            >
              <Input />
            </FormItem>

            <Form.Item>
              <Button
                icon={<SaveOutlined />}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Salvar
              </Button>
              <Button
                icon={<SaveOutlined />}
                onClick={() => setModalVisible(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancelar
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default SalesList;
