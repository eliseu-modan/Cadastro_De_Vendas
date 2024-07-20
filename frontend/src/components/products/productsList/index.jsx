import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Row, Col, Input, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useService } from "../../../contexts/service";
import { FormItem } from "../../_commons";
import { SaveOutlined } from "@ant-design/icons";

const PermanentsLists = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const service = useService();
  const [dataProducts, setDataProducts] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8, total: 0 });


  useEffect(() => {
    getProductsLists();
  }, []);

  async function getProductsLists() {
    setLoading(true);
    try {
      const { data } = await service.get("/products/auth/getProductsLists");
      setDataProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const columns = [
    { key: "name", dataIndex: "name", title: "Descrição do Produto" },
    {
      key: "price",
      dataIndex: "price",
      title: "Preço",
    },
    {
      key: "code",
      title: "Código",
      dataIndex: "code",
      align: "center",
    },
    {
      key: "Peso",
      title: "Peso",
      dataIndex: "Peso",

      align: "center",
    },
    {
      key: "Cor",
      title: "Cor",
      dataIndex: "Cor",
      align: "center",
    },
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
              style={{ position: "relative", top: "0px", left: "70%" }}
              onClick={() => {
                handleEditClick(data);
              }}
            />
            <Button
              style={{ position: "relative", top: "0px", left: "100%" }}
              icon={<DeleteOutlined />}
              onClick={() => {
                handleRemoveClick(data);
              }}
            />
          </Col>
        </Row>
      ),
    },
  ];
  // const closeModalTask = () => {
  //   setSelectedTask(null);
  //   setModalVisibleTask(false);
  // };

  function handleRemoveClick(data) {
    Modal.confirm({
      title: "Remover Produto",
      content: `Deseja realmente remover o Produto "${data.name}?"`,
      okText: "Remover",
      cancelText: "Cancelar",
      onOk: () => onRemoveProduct(data),
    });
  }

  async function onRemoveProduct(data) {
    try {
      await service.delete(`/products/auth/deleteProduct/${data.id}`);
      getProductsLists({ page: 1 });
    } catch (error) {
      throw error;
    }
  }

  const handleEditClick = (data) => {
    form.setFieldsValue(data);
    setModalVisible(true);
  };
  async function onSubmitEdit(values) {
    try {
      setLoading(true);
      const response = await service.patch(
        `/products/auth/updateProduct/${form.getFieldValue("id")}`,
        values
      );
      getProductsLists({ page: 1 });
      setIsEditFormVisible(false);
      message.success("Tarefa atualizada com sucesso!");
    } catch (error) {
      message.error("Não foi possível atualizar a Tarefa.");
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
        <Table
          columns={columns}
          dataSource={dataProducts}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
        ></Table>
        <Modal
          title="Editar Produto"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={onSubmitEdit} layout="vertical">
            <FormItem
              name="name"
              label="Nome"
              rules={[
                { required: true },
                { type: "name", message: "Nome inválido" },
              ]}
            >
              <Input />
            </FormItem>

            <FormItem
              name="price"
              label="Preço"
              rules={[
                { required: true },
                { type: "price", message: "Preço inválido" },
              ]}
            >
              <Input />
            </FormItem>

            <FormItem
              name="Cor"
              label="Cor"
              rules={[
                { required: true },
                { type: "Cor", message: "Cor inválido" },
              ]}
            >
              <Input />
            </FormItem>
            <FormItem
              name="code"
              label="Código"
              rules={[
                { required: true },
                { type: "code", message: "Código inválido" },
              ]}
            >
              <Input />
            </FormItem>
            <FormItem
              name="Peso"
              label="Peso"
              rules={[
                { required: true },
                { type: "Peso", message: "Peso inválido" },
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
                onClick={(a) => setModalVisible(false)}
              >
                Salvar
              </Button>
              <Button
                id="editButtonCancel"
                icon={<SaveOutlined />}
                type="primary"
                onClick={(a) => setModalVisible(false)}
                style={{ position: "relative", left: "10%" }}
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

export default PermanentsLists;
