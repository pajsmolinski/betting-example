import {
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useContext } from "react";

import { BettingContext } from "../../providers/betting";

export const MoneyBetting = () => {
  const { bet, setBet } = useContext(BettingContext);

  return (
    <NumberInput margin={5} value={bet} onChange={(_, value) => setBet(value)}>
      <NumberInputField data-testid={"money-input"} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};
