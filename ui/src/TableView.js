import { useState } from "react";
import moment from "moment";
import ReactResizeDetector from "react-resize-detector";
import { Flex, Box, Button, Text, SelectMenu, BorderBox } from "@primer/components";
import DatePicker from "react-datepicker";
import Table from "./components/Table";

const TableView = () => {
  const [range, setRange] = useState([
    moment().subtract(2, "day").startOf("day").toDate(),
    moment().endOf("day").toDate(),
  ]);
  const [selected, setSelected] = useState(["kelengasan_1"]);
  const [fields] = useState([{
    color: "#9b59b6",
    field: "kelengasan_1",
    name: "Tanah I",
    alt: "Kelengasan Tanah Bedeng I"
  }, {
    color: "#9b59b6",
    field: "kelengasan_2",
    name: "Tanah II",
    alt: "Kelengasan Tanah Bedeng II"
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
    <>
      <Text
        as="h5"
        px={4}
        m={0}
        color="gray.4"
        fontWeight="normal"
      >Laporan</Text>
      <Flex px={4} alignItems="center">
        <Box flexGrow={1}>
          <Text
            as="h1"
            m={0}
            pb={2}
            fontSize={36}
            fontWeight="bold"
          >Tabel</Text>
        </Box>
        <Box>
          <SelectMenu>
            <Button as="summary" variant="medium">
              {moment(range[0]).format("Do MMM YY")}
              {" \u2192 "}
              {moment(range[1]).format("Do MMM YY")}
            </Button>
            <SelectMenu.Modal >
              <SelectMenu.Header>Calendar</SelectMenu.Header>
              <SelectMenu.Tabs>
                <SelectMenu.Tab index={0} tabName="From" />
                <SelectMenu.Tab index={1} tabName="To" />
              </SelectMenu.Tabs>
              <SelectMenu.TabPanel tabName="From">
                <Flex justifyContent="center" pt={3}>
                  <DatePicker
                    maxDate={range[1]}
                    selected={range[0]}
                    onChange={(date) => setRange(range => [date, range[1]])}
                    inline
                  />
                </Flex>
              </SelectMenu.TabPanel>
              <SelectMenu.TabPanel tabName="To">
                <Flex justifyContent="center" pt={3}>
                  <DatePicker
                    minDate={range[0]}
                    selected={range[1]}
                    onChange={(date) => setRange(range => [range[0], date])}
                    inline
                  />
                </Flex>
              </SelectMenu.TabPanel>
              <SelectMenu.Footer>
                {moment(range[0]).format("DD MMM YYYY")}
                {" \u2192 "}
                {moment(range[1]).format("DD MMM YYYY")}
              </SelectMenu.Footer>
            </SelectMenu.Modal>
          </SelectMenu>
        </Box>
      </Flex>
      <Box
        mx={-2}
        pb={2}
        px={4}
        style={{ overflowY: "auto", whiteSpace: "nowrap" }}
        flexShrink={0}
      >
        {fields.map(({ field, name }) => (
          <Box
            key={field}
            px={2}
            display="inline-block"
          >
            <BorderBox
              p={2}
              backgroundColor="white"
              borderColor={(selected.indexOf(field) !== -1) ? "blue.5" : undefined}
              onClick={() => {
                setSelected(selected => {
                  if (selected.indexOf(field) !== -1) {
                    if (selected.length === 1)
                      return selected;
                    return selected.filter(item => item !== field);
                  } else {
                    if (selected.length >= 2)
                      return selected;
                    return [...selected, field];
                  }
                })
              }}
            >
              <Text>{name}</Text>
            </BorderBox>
          </Box>
        ))}
      </Box>
      <Box flexGrow={1} style={{ position: "relative" }}>
        <Flex
          px={4} pb={3}
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            bottom: 0
          }}
        >
          <BorderBox
            flexGrow={1}
            p={2}
            backgroundColor="white"
          >
            <ReactResizeDetector>
              {({ width, height, targetRef }) => (
                <Box
                  height="100%"
                  ref={targetRef}
                >
                  <Table
                    width={width}
                    height={height}
                    list={[]}
                    selected={["time", ...selected]}
                    column={[
                      {
                        dataKey: "time",
                        label: "Timestamp",
                        width: 50
                      }, {
                        dataKey: "kelengasan_1",
                        label: "Tanah I",
                        width: 50
                      }, {
                        dataKey: "kelengasan_2",
                        label: "Tanah II",
                        width: 50
                      }, {
                        dataKey: "suhu",
                        label: "Suhu",
                        width: 50
                      }, {
                        dataKey: "kelembapan",
                        label: "Kelembapan",
                        width: 50
                      }, {
                        dataKey: "cahaya",
                        label: "Cahaya",
                        width: 50
                      }, {
                        dataKey: "air",
                        label: "Air",
                        width: 50
                      }
                    ]} />
                </Box>)}
            </ReactResizeDetector>
          </BorderBox>
        </Flex>
      </Box>
    </>
  )
}

export default TableView;