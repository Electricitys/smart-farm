import React from "react";
import { BorderBox, Box, Button, Flex, Text } from "@primer/components";
import { KebabHorizontalIcon } from "@primer/octicons-react";
import ReactResizeDetector from 'react-resize-detector';
import AspectRatio from "./AspectRatio";
import WidgetChart from "./WidgetChart";

const Widget = ({ name, field, style, color, data, active }) => {
  return (
    <AspectRatio ratio="16:9">
      <BorderBox
        p={2}
        backgroundColor="white"
        borderColor={active ? "blue.5" : undefined}
        style={{
          ...style,
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        <Flex flexDirection="column" height="100%">
          <Flex alignItems="center">
            <Box flexGrow={1}>
              <Text fontSize={3} fontWeight="bold">{name}</Text>
            </Box>
            <Box flexShrink={0}>
              <Button variant="small">
                <KebabHorizontalIcon size="small" />
              </Button>
            </Box>
          </Flex>
          <ReactResizeDetector>
            {({ width, height, targetRef }) => (
              <Box ref={targetRef} flexGrow={1}>
                <WidgetChart label={name} field={field} color={color} width={width} height={height} data={data} />
              </Box>)}
          </ReactResizeDetector>
        </Flex>
      </BorderBox>
    </AspectRatio>
  )
}

export default Widget;