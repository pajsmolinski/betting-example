import { Button } from "@chakra-ui/react";
import { useContext } from "react";

import { BettingContext } from "../../providers/betting";

export const ResetBetting = () => {
  const { reset } = useContext(BettingContext);

  return (
    <Button margin={5} onClick={reset}>
      Reset
    </Button>
  );
};
