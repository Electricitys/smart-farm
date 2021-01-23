import {
  BrowserRouter,
  Route,
  Switch,
  Link
} from "react-router-dom";
import { Flex, Box, Button, Text, SelectMenu } from "@primer/components";
import { HeartFillIcon, ThreeBarsIcon } from "@primer/octicons-react";
import ChartView from "./ChartView";
import TableView from "./TableView";

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
            <SelectMenu>
              <Button as="summary" variant="medium">
                <ThreeBarsIcon size={16} />
              </Button>
              <SelectMenu.Modal>
                <SelectMenu.Header>Halaman</SelectMenu.Header>
                <SelectMenu.List>
                  <SelectMenu.Item as={Link} to="/">Chart</SelectMenu.Item>
                  <SelectMenu.Item as={Link} to="/table">Table</SelectMenu.Item>
                </SelectMenu.List>
                <SelectMenu.Footer>
                  <Text>Made with <Text color="red.5"><HeartFillIcon size={12} /></Text> by tagConn</Text>
                </SelectMenu.Footer>
              </SelectMenu.Modal>
            </SelectMenu>
          </Box>
          <Switch>
            <Route path="/table" component={TableView} />
            <Route path="/" component={ChartView} />
          </Switch>
        </Flex>
      </Box>
    </BrowserRouter>
  );
}

export default App;
