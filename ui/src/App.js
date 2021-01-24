import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import { Flex, Box } from "@primer/components";
import ChartView from "./ChartView";
import TableView from "./TableView";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
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
            maxWidth: 500,
            overflowX: "hidden",
            overflowY: "auto",
            margin: "0 auto"
          }}>
          <Box py={2} px={4}>
            <Header />
          </Box>
          <Switch>
            <Route path="/table" component={TableView} />
            <Route path="/" component={ChartView} />
          </Switch>
        </Flex>
      </Box>
    </BrowserRouter >
  );
}

export default App;
