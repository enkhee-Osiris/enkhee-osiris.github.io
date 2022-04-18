import { Anchor, Article, Box, Col, Grid, Img, Page, Text } from "@enkhee-Osiris/ui";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>enkhee-Osiris || personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <Article>
          <Grid
            css={{ gridTemplateColumns: "1fr", "@md": { gridTemplateColumns: "1fr 320px" } }}
            gap={32}
          >
            <Col>
              <Text variant="text" size="lg">
                Hey, I am <strong>Enkherdene</strong> (enkhee-Osiris), freelancer.
              </Text>
              <Text variant="text" size="lg">
                I am front-end developer living in <strong>Ulaanbaatar</strong> (Mongolia). I focus
                on solve problems and create seamless experiences.
              </Text>
              <Text variant="text" size="lg">
                I enjoy taking photography with film cameras.
                <br />
                <Anchor url="/about/" text="More about me" />
              </Text>
            </Col>

            <Col>
              <Box css={{ width: "100%", mb: "$space$16", borderRadius: 4, overflow: "hidden" }}>
                <AspectRatio.Root ratio={6 / 3}>
                  <Img src="/me.jpg" alt="Enkherdene" />
                </AspectRatio.Root>
              </Box>

              <Text variant="text" size="lg">
                <Anchor url="/contact/" text="If you'd like to work with me" />
              </Text>
            </Col>
          </Grid>
        </Article>
      </Page>
    </>
  );
}

export default Home;
