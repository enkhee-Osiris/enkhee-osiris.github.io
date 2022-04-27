import { Col, Page, SocialLink, Text } from "@enkhee-Osiris/ui";
import Head from "next/head";

function Contact() {
  return (
    <>
      <Head>
        <title>Find me ▮ enkhee-Osiris</title>
      </Head>

      <Page heading="Find me on">
        <Text as="div" variant="text" size="xl" weight="bold">
          <Col gap={8}>
            <SocialLink
              iconName="email"
              iconSize={48}
              text="enkhee.ag@gmail.com"
              url="mailto:enkhee.ag@gmail.com"
            />

            <SocialLink
              iconName="github"
              iconSize={48}
              text="/enkhee-Osiris"
              url="https://github.com/enkhee-Osiris/"
            />

            <SocialLink
              iconName="twitter"
              iconSize={48}
              text="@enkheeOsiris"
              url="https://twitter.com/enkheeOsiris"
            />

            <SocialLink
              iconName="linkedin"
              iconSize={48}
              text="/enkherdene-bolormaa"
              url="https://www.linkedin.com/in/enkherdene-bolormaa/"
            />

            <SocialLink
              iconName="discord"
              iconSize={48}
              text="enkhee-Osiris#4927"
              url="https://discordapp.com/users/544732968271347740"
            />

            <SocialLink
              iconName="telegram"
              iconSize={48}
              text="@Osiris_l33t"
              url="https://t.me/Osiris_l33t"
            />

            <SocialLink
              iconName="instagram"
              iconSize={48}
              text="osiris.leet"
              url="https://www.instagram.com/osiris.leet/"
            />
          </Col>
        </Text>
      </Page>
    </>
  );
}

export default Contact;
