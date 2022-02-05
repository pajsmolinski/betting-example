import { Center, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useParams, Navigate } from "react-router-dom";

import { getParticipants } from "../api/getParticipants";
import { getSingleRace } from "../api/getSingleRace";
import { MoneyBetting, ResetBetting } from "../components/Betting";
import { MainLayout } from "../components/Layout/MainLayout";
import { ParticipantsTable } from "../components/Tables/ParticipantsTable";
import { BettingProvider } from "../providers/betting";

export const Race: React.ComponentType = () => {
  const { id } = useParams();

  const raceQuery = useQuery(
    ["race", id],
    () => getSingleRace(parseInt(id || "")),
    {
      enabled: !!id,
    }
  );

  const participantsIds = raceQuery.data?.participants;

  const participantsQuery = useQuery(
    ["participants", id],
    () => getParticipants(participantsIds || []),
    {
      enabled: !!participantsIds,
    }
  );

  if (!id) {
    return <Navigate to={"/"} />;
  }

  return (
    <MainLayout>
      {raceQuery.isLoading && (
        <Center py={5}>
          <Spinner />
        </Center>
      )}

      {raceQuery.isSuccess && raceQuery.data && (
        <>
          <Heading padding={5}>{raceQuery.data.name}</Heading>
          {participantsQuery.isLoading && (
            <Center py={5}>
              <Spinner />
            </Center>
          )}
          {participantsQuery.isSuccess && participantsQuery.data && (
            <BettingProvider race={raceQuery.data.id}>
              <MoneyBetting />
              <ParticipantsTable items={participantsQuery.data} />
              <ResetBetting />
            </BettingProvider>
          )}
        </>
      )}
    </MainLayout>
  );
};
