import { Row, Form, Card, Typography, Divider, Button, Col } from "antd";
import PhoneInput from "../components/input-phone";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import { selectUserState, UserState } from "../store/userSlice";

const Home: NextPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const userState: UserState = useSelector(selectUserState);

  return (
    <Card style={{ maxWidth: "800px", margin: "auto" }}>
      <Typography.Title level={4} style={{ margin: "1rem auto" }}>
        Simple phone validation feature mobile app
      </Typography.Title>

      <Divider />
      <Row justify="space-between" style={{ margin: "1rem auto" }}>
        <Button type="primary" htmlType="submit" onClick={() => router.push("/prev")}>
          Prev Step
        </Button>
        <Button type="primary" htmlType="submit" onClick={() => router.push("/next")}>
          Next Step
        </Button>
      </Row>
      <Form form={form} layout="vertical">
        <Form.Item
          // hasFeedback
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter a valid phone number!",
            },
            {
              validator(_, value) {
                if (value && !userState.isPhoneVerify) {
                  return Promise.reject(
                    new Error("Phone number is invalid, please try another one!")
                  );
                }
                if (userState.isPhoneVerify) {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <PhoneInput />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Home;
