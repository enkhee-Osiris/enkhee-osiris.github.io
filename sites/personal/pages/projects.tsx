import { Col, Grid, Icon, Page, Text, styled } from "@enkhee-Osiris/ui";
import Head from "next/head";

import PROJECTS from "@/constants/projects.json";

const StyledA = styled("a", {
  borderRadius: "$space$12",
  m: "-$space$8",
  mY: "-$space$16",
  p: "$space$8",
  pY: "$space$16",

  "&:hover, &:active": {
    backgroundColor: "$gray4",
    h1: { color: "$orange10" },
  },
  ".dark-theme &:hover, .dark-theme &:active": {
    backgroundColor: "$gray2",
  },
  "@md": { m: "-$space$16", p: "$space$16" },
});

function ProjectItem({
  name,
  url,
  description,
}: {
  name: string;
  url: string;
  description: string;
}) {
  return (
    <StyledA href={url}>
      <Col gap={8}>
        <Text
          as="h1"
          weight="bold"
          size="lg"
          css={{ color: "$gray12", display: "inline-flex", alignItems: "center" }}
        >
          {name}
          <Icon css={{ marginLeft: "$space$8" }} name="arrow-right" />
        </Text>

        <Text css={{ color: "$gray11" }}>{description}</Text>
      </Col>
    </StyledA>
  );
}

export default function Projects({ projects }: { projects: typeof PROJECTS }) {
  return (
    <>
      <Head>
        <title>Projects ▮ enkhee-Osiris</title>
      </Head>

      <Page heading="Things I've done">
        <Grid columns={{ "@initial": 1, "@md": 2 }} gap={48}>
          {projects.map(({ name, url, description }) => (
            <ProjectItem key={name} name={name} url={url} description={description} />
          ))}
        </Grid>
      </Page>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { projects: PROJECTS },
  };
}
