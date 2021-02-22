import { useState } from "react";
import { Dropdown as PrimerDropdown } from "@primer/components";

const Dropdown = ({ menu, value, onClick }) => {
  const [open, setOpen] = useState(false);
  return (
    <PrimerDropdown open={open} onToggle={(e) => setOpen(e.target.open)} >
      <PrimerDropdown.Button>{value || "Pilih"}</PrimerDropdown.Button>
      <PrimerDropdown.Menu>
        {menu.map((item, idx) => (
          <PrimerDropdown.Item key={item} onClick={() => {
            if (typeof onClick === "function") onClick(item);
            setOpen(false);
          }}>{item}</PrimerDropdown.Item>
        ))}
      </PrimerDropdown.Menu>
    </PrimerDropdown>
  )
}

export default Dropdown;