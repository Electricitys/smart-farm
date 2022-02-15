import { useCallback, useContext, useEffect, useState } from "react";
import moment from "moment";
import ReactResizeDetector from "react-resize-detector";
import { Flex, Box, Button, Text, SelectMenu, BorderBox } from "@primer/components";
import DatePicker from "react-datepicker";
import Table from "./components/Table";
import { FeathersContext } from "./components/feathers";

const sortDataWithDate = (array, field) => {
  let arr = [...array];
  arr.sort(function compare(a, b) {
    var dateA = new Date(a[field]);
    var dateB = new Date(b[field]);
    return dateA - dateB;
  });
  return arr;
}


const TableView = ({ setFullscreen }) => {
  const feathers = useContext(FeathersContext);
  const [range, setRange] = useState([
    moment().subtract(2, "day").startOf("day").toDate(),
    moment().endOf("day").toDate(),
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(["kelengasan_1", "suhu", "kelembapan"]);
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
    color: "#9b59b6",
    field: "kelengasan_3",
    name: "Tanah III",
    alt: "Kelengasan Tanah Bedeng III"
  }, {
    color: "#e74c3c",
    field: "suhu",
    name: "Suhu",
    alt: "Suhu Lingkungan"
  }, {
    color: "#2ecc71",
    field: "kelembapan",
    name: "Kelembaban",
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

  const resample = useCallback((data) => {
    const parse = (val) => {
      return Math.abs(Number(val).toFixed(2));
    }
    let res = data.map(value => ({
      time: moment(value.id).format("Do MMM 'YY, hh:mm:a"),
      ...value,
      kelengasan_1: parse(value["kelengasan_1"]),
      kelengasan_2: parse(value["kelengasan_2"]),
      kelengasan_3: parse(value["kelengasan_3"]),
      suhu: parse(value["suhu"]),
      kelembapan: parse(value["kelembapan"]),
      air: parse(value["air"]),
      cahaya: parse(value["cahaya"]),
    }));
    res = sortDataWithDate(res, "id");
    return res;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const fetch = useCallback(async (skip) => {
    let d = [];
    try {
      d = await feathers.datalake.find({
        query: {
          $sample: "hour",
          createdAt: {
            $gte: range[0].toISOString(),
            $lte: range[1].toISOString(),
          },
          $skip: skip,
          $limit: 25
        }
      });

    } catch (e) {
      console.error(e);
    }
    return d;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  useEffect(() => {
    setFullscreen(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(0).then(async (res) => {
      let data = resample(res.data);
      if (data.length > 0) {
        await setData(data);
        await setTotalData(res.total.length);
      }
      await setIsLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  return (
    <>
      <Flex alignItems="center">
        <Box flexGrow={1}>
          <Text
            as="h5"
            px={4}
            m={0}
            color="gray.4"
            fontWeight="normal"
          >Laporan</Text>
        </Box>
        <Box>
          <Text
            as="p"
            px={4}
            m={0}
            color="gray.4"
            fontSize="0.83em"
            fontWeight="normal"
          >
            {!isLoaded && <Text>{"Loading... "}</Text>}
            {(isLoaded && totalData === 0) &&
              <Text fontWeight="bolder" color="red.5">{"No Data Recorded "}</Text>}
            Total <Text fontWeight="bolder" color="gray.5">{totalData}</Text>
          </Text>
        </Box>
      </Flex>
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
        <Box sx={{ position: "relative" }}>
          <SelectMenu>
            <Button as="summary" variant="medium">
              {moment(range[0]).format("Do MMM 'YY")}
              {" \u2192 "}
              {moment(range[1]).format("Do MMM 'YY")}
            </Button>
            <SelectMenu.Modal align="right">
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
        {fields.map(({ field, name, alt }) => (
          <Box
            key={field}
            px={2}
            display="inline-block"
          >
            <BorderBox
              p={2}
              role="button"
              title={alt}
              backgroundColor="white"
              borderColor={(selected.indexOf(field) !== -1) ? "blue.5" : undefined}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setSelected(selected => {
                  if (selected.indexOf(field) !== -1) {
                    if (selected.length === 1)
                      return selected;
                    return selected.filter(item => item !== field);
                  } else {
                    // if (selected.length >= 4)
                    //   return selected;
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
      <Flex
        flexGrow={1}
        px={4} pb={3}
      >
        <BorderBox
          as={Flex}
          width="100%"
          flexGrow={1}
          p={2}
          backgroundColor="white"
        >
          <Box width="100%" style={{ position: "relative" }}>
            <ReactResizeDetector>
              {({ width, height, targetRef }) => (
                <Box
                  ref={targetRef}
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    bottom: 0
                  }}
                >
                  <Table
                    width={width}
                    height={height}
                    list={data}
                    count={totalData}
                    onLoadMoreRows={({ startIndex }) => {
                      fetch(startIndex).then(async (res) => {
                        const d = resample(res.data);
                        await setData(data => [...data, ...d]);
                      });
                    }}
                    selected={["time", ...selected]}
                    column={[
                      {
                        dataKey: "time",
                        label: "Timestamp",
                        width: 165
                      }, {
                        dataKey: "kelengasan_1",
                        label: "Tanah I",
                        width: 75
                      }, {
                        dataKey: "kelengasan_2",
                        label: "Tanah II",
                        width: 75
                      }, {
                        dataKey: "kelengasan_3",
                        label: "Tanah III",
                        width: 90
                      }, {
                        dataKey: "suhu",
                        label: "Suhu",
                        width: 50
                      }, {
                        dataKey: "kelembapan",
                        label: "Kelembaban",
                        width: 110
                      }, {
                        dataKey: "cahaya",
                        label: "Cahaya",
                        width: 75
                      }, {
                        dataKey: "air",
                        label: "Air",
                        width: 50
                      }
                    ]}
                  />
                </Box>
              )}
            </ReactResizeDetector>
          </Box>
        </BorderBox>
      </Flex>
    </>
  )
}

export default TableView;