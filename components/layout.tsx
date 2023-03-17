import { ConfigProvider, theme, Layout, Row, Switch } from "antd";
import React, { useState } from "react";
import Theme from "../styles/theme";
import { ThemeContext } from "../context/theme";

interface Props {
  children: React.ReactNode;
}

const { defaultAlgorithm, darkAlgorithm } = theme;

const MyLayout: React.FC<Props> = (props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        ...Theme,
      }}
    >
      <ThemeContext.Provider value={{ theme: isDarkMode ? "Dark" : "Light" }}>
        <Layout style={{ padding: "1rem", height: "100vh" }}>
          <Row justify="end" style={{ margin: "1rem 0" }}>
            <Switch
              defaultChecked={isDarkMode}
              checkedChildren="Dark Mode"
              unCheckedChildren="Light Mode"
              onChange={() => setIsDarkMode((preVal) => !preVal)}
            />
          </Row>
          {props.children}
        </Layout>
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};

export default MyLayout;
