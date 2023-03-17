import { Typography, Button, Card } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const Next: NextPage = () => {
  const router = useRouter();
  return (
    <Card
      style={{ margin: "auto" }}
      title={<Typography.Title level={4}>This is a dummy page</Typography.Title>}
    >
      <Typography style={{ marginBottom: "1rem" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Typography>
      <Button type="primary" onClick={() => router.back()}>
        Previous Step
      </Button>
    </Card>
  );
};

export default Next;
