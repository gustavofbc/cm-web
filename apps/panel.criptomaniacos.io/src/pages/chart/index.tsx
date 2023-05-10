import React from "react";
import dynamic from "next/dynamic";
// import { Avatar, Button, Center, Container, Grid, GridItem } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Theme from "@/components/Theme";
import { authMiddleware } from "@/components/WithAuth";

const TVChartContainer = dynamic(
  () => import("@/components/tv-chart-container").then((component) => component),
  { ssr: false },
);

export default function Chart() {
  const { data: session } = useSession();

  return (
    <div>
      <Theme>
        <TVChartContainer />
      </Theme>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  return authMiddleware(context);
}
