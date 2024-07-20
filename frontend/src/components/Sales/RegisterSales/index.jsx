import React, { useEffect, useState } from "react";
import { LoginOutlined } from "@ant-design/icons";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { useService } from "../../../contexts/service";
import { FormItem } from "../../_commons";
import { useNavigate } from "react-router-dom";

function registerSales() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  const navigate = useNavigate();
  const service = useService();

  useEffect(() => {
    getDataProducts();
  }, []);
  async function getDataProducts() {
    setLoading(true);
    try {
      const { data } = await service.get("/products/auth/getProductsLists");
      setDataProducts(data);

    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  }
  async function onSubmitProduct(values) {
    setLoading(true);
    console.log("values create sales",values)
    try {
      const data = await service.post("/sales/auth/createSales", values);
      navigate("/Registrar-Vendas");
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  }
  const onSubmitProductData = (values) => {
    onSubmitProduct(values);
    console.log(values);
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
            label="Selecionar o Produto"
            rules={[
              {
                required: true,
                message: "Por favor, selecione o Produto",
              },
            ]}
          >
            <Select>
              {dataProducts.map((Product) => (
                <Option key={Product.id}  value={`${Product.name}-${Product.code}`}>
                  {Product.name} - R${Product.price} - Código: {Product.code}
                </Option>
              ))}
            </Select>
          </FormItem>

          <FormItem
            name="date"
            label="Selecionar a Data"
            rules={[
              {
                required: true,
                message: "Por favor, selecione a Data",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </FormItem>

          <FormItem
            name="quantity"
            label="Cadastrar Quantidades"
            rules={[
              {
                required: true,
                message: "Por favor, insira a quantidade",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </FormItem>

          <FormItem
            name="monthlyTarget"
            label="Cadastrar Meta do Mês"
            rules={[
              {
                required: true,
                message: "Por favor, insira a Meta do Mês",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
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
            {loading ? "Aguarde..." : "Registrar Venda"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default registerSales;
