import { Radio, Td } from "@chakra-ui/react";
import React, { useContext } from "react";

import { BettingContext } from "../../providers/betting";

interface PlaceBettingProps {
  participant: number;
}

export const PlaceBetting: React.ComponentType<PlaceBettingProps> = ({
  participant,
}) => {
  const { winners, setWinner } = useContext(BettingContext);

  return (
    <>
      <Td>
        <Radio
          colorScheme={"yellow"}
          isChecked={winners[1] === participant}
          data-testid={`${participant}-bet-1st`}
          onChange={(e) => e.target.checked && setWinner(participant, 1)}
        />
      </Td>
      <Td>
        <Radio
          colorScheme={"gray"}
          isChecked={winners[2] === participant}
          data-testid={`${participant}-bet-2nd`}
          onChange={(e) => e.target.checked && setWinner(participant, 2)}
        />
      </Td>
      <Td>
        <Radio
          colorScheme={"orange"}
          isChecked={winners[3] === participant}
          data-testid={`${participant}-bet-3rd`}
          onChange={(e) => e.target.checked && setWinner(participant, 3)}
        />
      </Td>
    </>
  );
};
