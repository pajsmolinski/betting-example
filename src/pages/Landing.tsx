import { Center, Checkbox, Heading, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { getRaces } from "../api/getRaces";
import { MainLayout } from "../components/Layout/MainLayout";
import { RacesTable } from "../components/Tables";
export const Landing: React.ComponentType = () => {
  const racesQuery = useQuery("allRaces", () => getRaces());

  const [filterInactive, setFilterInactive] = useState(false);

  return (
    <MainLayout>
      <Heading padding={5}>Betting App</Heading>
      <Checkbox
        padding={5}
        isChecked={filterInactive}
        onChange={(e) => setFilterInactive(e.target.checked)}
      >
        Show only active
      </Checkbox>
      {racesQuery.isLoading && (
        <Center py={5}>
          <Spinner />
        </Center>
      )}
      {racesQuery.isSuccess && racesQuery.data && (
        <RacesTable
          items={racesQuery.data.filter((item) =>
            filterInactive ? item.active : true
          )}
        />
      )}
    </MainLayout>
  );
};
