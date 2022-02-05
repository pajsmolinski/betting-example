import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import { Race } from "../../types";
import { RightArrow } from "../Elements/RightArrow";

interface RacesTableProps {
  items: Race[];
}

export const RacesTable: React.ComponentType<RacesTableProps> = ({ items }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Race</Th>
          <Th display={["none", "table-cell"]}>Participants</Th>
          <Th>Active</Th>
          <Th>Bet</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item) => (
          <Tr key={item.id} data-testid={"race-row"}>
            <Td>{item.name}</Td>
            <Td isNumeric display={["none", "table-cell"]}>
              {item.participants.length}
            </Td>
            <Td>{item.active ? "Active" : "Inactive"}</Td>
            <Td>
              <Link to={`/race/${item.id}`}>
                <IconButton
                  disabled={!item.active}
                  aria-label={"Bet"}
                  padding={2}
                  icon={<RightArrow />}
                />
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
