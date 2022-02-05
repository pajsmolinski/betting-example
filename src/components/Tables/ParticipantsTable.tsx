import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

import { Participant } from "../../types";
import { PlaceBetting } from "../Betting";

interface ParticipantsTableProps {
  items: Participant[];
}

export const ParticipantsTable: React.ComponentType<ParticipantsTableProps> = ({
  items,
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Winner</Th>
          <Th>2nd</Th>
          <Th>3rd</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item) => (
          <Tr key={item.id}>
            <Td>{item.body}</Td>
            <PlaceBetting participant={item.id} />
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
