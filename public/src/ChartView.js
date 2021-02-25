import { useContext, useEffect, useState } from "react";
import { Avatar, Flex, Box, Text } from "@primer/components";
import ReactResizeDetector from "react-resize-detector";
import moment from "moment";
import Widget from "./components/Widget";
import HeroWidget from "./components/HeroWidget";
import { FeathersContext } from "./components/feathers";
import Dropdown from "./components/Dropdown";

import _sortBy from "lodash.sortby";

function ChartView({ setFullscreen }) {
  const feathers = useContext(FeathersContext);
  const [months] = useState([
    "Januari", "Februari", "Maret",
    "April", "Mei", "Juni",
    "Juli", "Agustus", "September",
    "Oktober", "November", "Desember",
  ]);
  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(["kelengasan_1"]);
  const [month, setMonth] = useState(null);
  const [range, setRange] = useState([]);
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
    if (range.length === 0) return;
    const fetch = async () => {
      let d = [];
      try {
        d = await feathers.datalake.find({
          query: {
            $sample: "day",
            updatedAt: {
              $gte: range[0],
              $lte: range[1]
            },
            $limit: 100
          }
        });
      } catch (e) {
        return;
      }

      let resample = d.data.map((value) => {
        return {
          time: value.id,
          ...value
        }
      });

      resample = _sortBy(resample, "time")

      setTotalData(d.total.length);
      setData(resample.map((data) => {
        return {
          ...data,
          time: moment(data.time).unix()
        }
      }));
    }
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  useEffect(() => {
    if (month === null) {
      setMonth(months[moment().get("month")]);
      return;
    }
    const currentRange = moment().set("month", months.indexOf(month));
    const startRange = currentRange.startOf("month").toISOString();
    const endRange = currentRange.endOf("month").toISOString();
    setRange([startRange, endRange]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  useEffect(() => {
    setFullscreen(false);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
          <Avatar size={48} src="https://avatars.githubusercontent.com/primer" />
        </Box>
      </Flex>
      <Flex px={4} pb={3} alignItems="center">
        <Box flexGrow={1}>
          <Text as="div">Total data</Text>
          <Text as="div" fontSize={28} fontWeight="bold">{totalData}</Text>
        </Box>
        <Box>
          <Dropdown
            menu={months}
            value={month}
            onClick={(item) => setMonth(item)}
          />
        </Box>
      </Flex>
      <Box
        mx={-2}
        pb={2}
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
              <HeroWidget
                width={width}
                height={h}
                fields={fields}
                data={data}
                selected={selected}
                range={range}
              />
            </Box>)
        }}
      </ReactResizeDetector>
    </>
  );
}

export default ChartView;
