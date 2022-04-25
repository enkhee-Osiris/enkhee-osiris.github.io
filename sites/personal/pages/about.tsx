import { useMemo } from "react";

import { Col, Page, Row, Text } from "@enkhee-Osiris/ui";
//import formatDistance from "date-fns/formatDistance";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import parse from "date-fns/parse";
import Head from "next/head";

function Title({ children }: { children: React.ReactText }) {
  return (
    <Text as="h3" variant="display" size="sm" css={{ mt: "$space$32", mb: "$space$16" }}>
      {children}
    </Text>
  );
}

function CareerItem({
  dates,
  name,
  position,
  location,
}: {
  dates: string;
  name?: string;
  position: string;
  location: string;
}) {
  const dateDistance = useMemo(() => {
    const [startDateStr, endDateStr] = dates.split(" - ");
    const startDate = parse(startDateStr, "LLL yyyy", new Date());
    const endDate = endDateStr === "present" ? null : parse(endDateStr, "LLL yyyy", new Date());

    if (endDate) {
      return ` (${formatDistanceStrict(startDate, endDate, { unit: "month" })}),`;
    }

    return ",";
  }, [dates]);

  return (
    <Col
      gap={8}
      css={{ "& + &": { mt: "$space$16", pt: "$space$16", borderTop: "1px solid $gray5" } }}
    >
      <Row gap={8}>
        <Text as="span" weight="medium">
          {position}
        </Text>
        {Boolean(name) && (
          <>
            <Text as="span">&ndash;</Text>
            <Text as="span" weight="bold">
              {name}
            </Text>
          </>
        )}
      </Row>

      <Row gap={8}>
        <Text as="span" css={{ color: "$gray11" }}>{`${dates}${dateDistance}`}</Text>
        <Text as="span" css={{ color: "$gray11" }} weight="medium">
          {location}
        </Text>
      </Row>
    </Col>
  );
}

function About() {
  return (
    <>
      <Head>
        <title>enkhee-Osiris || personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page heading="Hey">
        <Text variant="text" size="lg">
          My name is <strong>Enkh-Erdene</strong>. I was born and raised in Ulaanbaatar (Mongolia).
          I love trying modern technologies and learning new things.
        </Text>

        <Title>What I do</Title>

        <Text variant="text" size="lg">
          I enjoy building applications to solve problems. My front-end framework of choice is{" "}
          <strong>React (Next.js)</strong>. In the last few years, I have primarily written{" "}
          <strong>JavaScript</strong> and <strong>Typescript</strong>.
        </Text>

        <Title>Career</Title>
        <div>
          <CareerItem
            dates="Apr 2022 - present"
            position="Freelancer"
            location="Ulaanbaatar (Mongolia)"
          />
          <CareerItem
            dates="Aug 2021 - Mar 2022"
            name="Xyyp Music LLC"
            position="Senior Front-End Developer"
            location="Ulaanbaatar (Mongolia)"
          />
          <CareerItem
            dates="Oct 2018 - Jul 2021"
            name="AND Systems LLC"
            position="Front-End Developer"
            location="Ulaanbaatar (Mongolia)"
          />
          <CareerItem
            dates="Jul 2018 - Oct 2018"
            name="Nomadays LLC"
            position="Front-End Developer"
            location="Ulaanbaatar (Mongolia)"
          />
          <CareerItem
            dates="Jan 2017 - Jul 2018"
            name="EYS-STYLE"
            position="Full Stack Developer"
            location="Tokyo (Japan)"
          />
        </div>

        <Title>What else?</Title>

        <Text variant="text" size="lg">
          In my spare time I enjoy taking photos and cycling.
        </Text>
      </Page>
    </>
  );
}

export default About;
