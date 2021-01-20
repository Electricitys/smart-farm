import { useContext, useEffect, useState } from "react";
import { Avatar, Flex, Box, Button, Text, Dropdown, SelectMenu } from "@primer/components";
import { HeartFillIcon, ThreeBarsIcon } from "@primer/octicons-react";
import ReactResizeDetector from 'react-resize-detector';
import Widget from "./components/Widget";
import HeroWidget from "./components/HeroWidget";
import State from "./components/State";
import { FeathersContext } from "./components/feathers";

function App() {
  const feathers = useContext(FeathersContext);
  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(["kelengasan"]);
  const [fields] = useState([{
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

  useEffect(() => {
    const fetch = async () => {
      const d = await feathers.datalake.find({
        query: {
          $limit: 100
        }
      });
      setTotalData(d.total);
      setData(d.data);
    }
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <SelectMenu.Item href="#">Chart</SelectMenu.Item>
                <SelectMenu.Item href="#">Table</SelectMenu.Item>
              </SelectMenu.List>
              <SelectMenu.Header>
                <Text color="gray.5">Made with <Text color="red.5"><HeartFillIcon size={14} /></Text> by tagConn</Text>
              </SelectMenu.Header>
            </SelectMenu.Modal>
          </SelectMenu>
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
            <Text as="div" fontSize={28} fontWeight="bold">{totalData}</Text>
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
          {fields.map(({ name, alt, color, field }) => (
            <Box
              key={field}
              px={2}
              display="inline-block"
              width="70%"
              onClick={() => {
                setSelected(selected => {
                  return selected.indexOf(field) !== -1 ?
                    selected.length === 1 ?
                      selected : selected.filter(item => item !== field) : [...selected, field];
                })
              }}
            >
              <Widget
                name={name}
                alt={alt}
                field={field}
                color={color}
                data={data}
                active={selected.indexOf(field) !== -1}
              />
            </Box>
          ))}
        </Box>
        <ReactResizeDetector>
          {({ width, height, targetRef }) => {
            const h = height / width * 100 <= 25 ? 50 / 100 * width : height;
            return (
              <Box ref={targetRef} flexGrow={1}>
                <HeroWidget width={width} height={h} fields={fields} data={data} selected={selected} />
              </Box>)
          }}
        </ReactResizeDetector>
      </Flex>
    </Box>
  );
}

export default App;
