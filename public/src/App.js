import {
  Route,
  Switch
} from "react-router-dom";
import { Flex, Box } from "@primer/components";
import ChartView from "./ChartView";
import TableView from "./TableView";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [fullscreen, setFullscreen] = useState(false);
  return (
    <Box
      backgroundColor="gray.5"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Flex
        backgroundColor="gray.1"
        flexDirection="column"
        style={{
          height: "100%",
          maxWidth: fullscreen ? "100%" : 500,
          overflow: "hidden",
          margin: "0 auto"
        }}>
        <Box py={2} px={4}>
          <Header />
        </Box>
        <Switch>
          <Route path="/table" component={() => <TableView setFullscreen={setFullscreen} />} />
          <Route path="/" component={() => <ChartView setFullscreen={setFullscreen} />} />
        </Switch>
      </Flex>
    </Box>
  );
}

export default App;
