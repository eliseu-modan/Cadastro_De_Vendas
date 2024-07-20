import React, { useState } from "react";
import { LoginOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button } from "antd";
import { useService } from "../../../contexts/service";
import { FormItem } from "../../_commons";
import { useNavigate } from "react-router-dom";

function createProduct() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const service = useService();

  async function onSubmitProduct(values) {
    setLoading(true);
    try {
      const data = await service.post("/products/auth/createProducts", values);
      navigate("/Listar-Produtos");
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmitProductData = (values) => {
    onSubmitProduct(values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "83vh",
        backgroundColor: "#F9F8F8",
      }}
    >
      <Card
        style={{
          width: 800,
          padding: "30px 130px",
          borderRadius: 10,
          boxShadow: "0 50px 50px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form form={form} layout="vertical" onFinish={onSubmitProductData}>
          <FormItem
            name="name"
            label="Descrição do Produto"
            rules={[
              {
                required: true,
                message: "Por favor, insira a descrição do Produto",
              },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem
            name="price"
            label="Preço do Produto"
            rules={[
              {
                required: true,
                message: "Por favor, insira o preço do produto.",
              },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem
            name="code"
            label="Código do Produto"
            rules={[
              {
                required: true,
                message: "Por favor, insira o Código do Produto.",
              },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem
            name="Cor"
            label="Cor do Produto"
            rules={[
              {
                required: true,
                message: "Por favor, insira a cor do produto.",
              },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem
            name="Peso"
            label="Peso do Produto"
            rules={[
              {
                required: true,
                message: "Por favor, insira o peso do produto",
              },
            ]}
          >
            <Input />
          </FormItem>

          <Button
            htmlType="submit"
            block
            type="primary"
            icon={<LoginOutlined />}
            loading={loading}
            style={{
              background: "#1890ff",
              borderColor: "#1890ff",
              color: "white",
              height: "40px",
              borderRadius: "5px",
            }}
          >
            {loading ? "Aguarde..." : "Criar Produto"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default createProduct;
