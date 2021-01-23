import { useState } from "react";
import moment from "moment";
import { Flex, Box, Button, Text, SelectMenu } from "@primer/components";
import DatePicker from "react-datepicker";

const TableView = () => {
  const [range, setRange] = useState([
    moment().subtract(2, "day").toDate(),
    moment().toDate(),
  ]);
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
              {moment(range[0]).format("MMM YY")}
              {" \u2192 "}
              {moment(range[1]).format("MMM YY")}
            </Button>
            <SelectMenu.Modal>
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
                {moment(range[0]).format("L")}
                {" \u2192 "}
                {moment(range[1]).format("L")}
              </SelectMenu.Footer>
            </SelectMenu.Modal>
          </SelectMenu>
        </Box>
      </Flex>
    </>
  )
}

export default TableView;