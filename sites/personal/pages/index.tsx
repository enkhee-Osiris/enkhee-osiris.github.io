import { Anchor, Article, Box, Col, Grid, Img, Page, Text } from "@enkhee-Osiris/ui";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Hey, I&apos;m Enkherdene ▮ enkhee-Osiris</title>
      </Head>

      <Page>
        <Article>
          <Grid
            css={{ gridTemplateColumns: "1fr", "@md": { gridTemplateColumns: "1fr 300px" } }}
            gap={32}
          >
            <Col>
              <Text size="lg">
                Hey, I am <strong>Enkherdene</strong> (enkhee-Osiris), freelancer.
              </Text>
              <Text size="lg">
                I am a front-end developer, living in <strong>Ulaanbaatar</strong> (Mongolia). I
                love trying modern technologies and learning new things.
              </Text>
              <Text size="lg">
                And in my spare time, I enjoy taking photos with film cameras.
                <br />
                <Anchor url="/about/" text="More about me" />
              </Text>
            </Col>

            <Col>
              <Box css={{ width: "100%", mb: "$space$16", borderRadius: 4, overflow: "hidden" }}>
                <AspectRatio.Root ratio={6 / 3}>
                  <Img src="/me.webp" alt="Enkherdene" />
                </AspectRatio.Root>
              </Box>

              <Text size="lg">
                <Anchor url="/connect/" text="If you'd like to work with me" />
              </Text>
            </Col>
          </Grid>
        </Article>
      </Page>
    </>
  );
}

export default Home;
