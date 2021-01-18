import { useState } from "react";
import { Avatar, Flex, Box, Button, Text, Dropdown } from "@primer/components";
import Widget from "./components/Widget";
import ReactResizeDetector from 'react-resize-detector';
import { ThreeBarsIcon } from "@primer/octicons-react";
import HeroWidget from "./components/HeroWidget";
import State from "./components/State";

function App() {
  const [data] = useState([{
    color: "#9b59b6",
    field: "kelengasan",
    name: "Tanah",
    alt: "Kelengasan Tanah"
  }, {
    color: "#e74c3c",
    field: "suhu",
    name: "Suhu",
    alt: "Suhu Lingkungan"
  }, {
    color: "#2ecc71",
    field: "kelembapan",
    name: "Kelembapan",
    alt: "Kelembapan Lingkungan"
  }, {
    color: "#f1c40f",
    field: "cahaya",
    name: "Cahaya",
    alt: "Intensitas Cahaya"
  }, {
    color: "#3498db",
    field: "air",
    name: "Air",
    alt: "Air yang digunakan"
  }]);
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
          maxWidth: 400,
          overflowX: "hidden",
          overflowY: "auto",
          margin: "0 auto"
        }}>
        <Box py={2} px={4}>
          <Button variant="medium">
            <ThreeBarsIcon size={16} />
          </Button>
        </Box>
        <Flex px={4} alignItems="center">
          <Box flexGrow={1}>
            <Text
              as="h1"
              m={0}
              py={3}
              fontSize={36}
              fontWeight="bold"
            >Smart Farm</Text>
          </Box>
          <Box>
            <Avatar size={48} src="https://avatars.githubusercontent.com/github" />
          </Box>
        </Flex>
        <Flex px={4} pb={3} alignItems="center">
          <Box flexGrow={1}>
            <Text as="div">Total data</Text>
            <Text as="div" fontSize={28} fontWeight="bold">283k</Text>
          </Box>
          <Box>
            <State>
              {([open, setOpen]) => {
                const menu = [
                  "Januari",
                  "Februari",
                  "Maret",
                  "April",
                  "Mei",
                  "Juni",
                  "Juli",
                  "Agustus",
                  "September",
                  "Oktober",
                  "November",
                  "Desember",
                ]
                const handleToggle = (e) => setOpen(e.target.open);
                return (
                  <Dropdown open={open} onToggle={handleToggle} overlay={true}>
                    <Dropdown.Button>November</Dropdown.Button>
                    <Dropdown.Menu>
                      {menu.map((item) => (
                        <Dropdown.Item key={item} onClick={() => setOpen(false)}>{item}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                )
              }}
            </State>
          </Box>
        </Flex>
        <Box
          mx={-2}
          px={4}
          style={{ overflowY: "auto", whiteSpace: "nowrap" }}
          flexShrink={0}
        >
          {data.map((d) => (
            <Box
              key={d.field}
              px={2}
              display="inline-block"
              width="70%"
            >
              <Widget name={d.name} alt={d.alt} field={d.field} color={d.color} />
            </Box>
          ))}
        </Box>
        <ReactResizeDetector>
          {({ width, height }) => {
            const h = height / width * 100 <= 25 ? 50 / 100 * width : height;
            return (
              <Box flexGrow={1}>
                <HeroWidget width={width} height={h} />
              </Box>)
          }}
        </ReactResizeDetector>
      </Flex>
    </Box>
  );
}

export default App;
