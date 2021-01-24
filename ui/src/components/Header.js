import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex, Box, Button, Text, SelectMenu } from "@primer/components";
import { HeartFillIcon, ThreeBarsIcon } from "@primer/octicons-react";

const Header = () => {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  useEffect(() => {
    const onOffline = window.addEventListener("offline", () => {
      setIsOnline(false);
    })
    const onOnline = window.addEventListener("online", () => {
      setIsOnline(true);
    })
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator.serviceWorker]);
  return (
    <Flex alignItems="center">
      <Box flexGrow={1}>
        <SelectMenu>
          <Button as="summary" variant="medium">
            <ThreeBarsIcon size={16} />
          </Button>
          <SelectMenu.Modal>
            <SelectMenu.Header>Halaman</SelectMenu.Header>
            <SelectMenu.List>
              <SelectMenu.Item as={Link} selected={location.pathname === "/"} to="/">Chart</SelectMenu.Item>
              <SelectMenu.Item as={Link} selected={location.pathname === "/table"} to="/table">Table</SelectMenu.Item>
            </SelectMenu.List>
            <SelectMenu.Footer>
              <Text>Made with <Text color="red.5"><HeartFillIcon size={12} /></Text> by tagConn</Text>
            </SelectMenu.Footer>
          </SelectMenu.Modal>
        </SelectMenu>
      </Box>
      <Box>
        {!isOnline &&
          <Text color={"red.4"} fontWeight="bold">No Connection</Text>}
      </Box>
    </Flex>
  )
}

export default Header;