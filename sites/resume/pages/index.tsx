import { Box, CareerItem, Col, Page, Text } from "@enkhee-Osiris/ui";
import Head from "next/head";

function SkillItem({ category, skills }: { category: string; skills: string[] }) {
  return (
    <Col
      gap={{ "@initial": 4, "@md": 0 }}
      direction={{ "@initial": "column", "@md": "row" }}
      css={{
        "& + &": {
          borderTop: "1px solid $gray5",
          mt: "$space$16",
          pt: "$space$16",
        },
      }}
    >
      <Text weight="bold" css={{ "@md": { display: "flex", flex: 3 } }}>
        {category}
      </Text>
      <Text css={{ color: "$gray11", "@md": { display: "flex", flex: 4 } }}>
        {skills.join(", ")}
      </Text>
    </Col>
  );
}

function Title({ children }: { children: React.ReactText }) {
  return (
    <Text as="h3" variant="display" size="sm" css={{ mt: "$space$32", mb: "$space$16" }}>
      {children}
    </Text>
  );
}

function Home() {
  return (
    <>
      <Head>
        <title>Resume ▮ enkhee-Osiris</title>
      </Head>

      <Page heading="">
        <Col css={{ mb: "$space$32" }}>
          <Text variant="display" size="md" weight="bold">
            Enkherdene Bolormaa
          </Text>
          <Text variant="display" size="sm" weight="medium" css={{ color: "$gray11" }}>
            Front-End Developer
          </Text>
        </Col>

        <Text variant="text" size="lg">
          My name is <strong>Enkh-Erdene</strong>. I was born and raised in Ulaanbaatar (Mongolia).
          I have more than 5 years of experience in Web development. I love trying modern
          technologies and learning new things. And I enjoy configuring CI/CD, to improve the
          development experience.
        </Text>

        <Title>Skills</Title>

        <div>
          <SkillItem
            category="Programming Languages"
            skills={["JavaScript", "Typescript", "Python"]}
          />
          <SkillItem category="Databases" skills={["MySQL", "PostgreSQL"]} />
          <SkillItem
            category="Libs and Frameworks"
            skills={["React", "React Native", "NextJS", "ExpressJS"]}
          />
          <SkillItem category="Tools and Platforms" skills={["Docker", "Webpack", "Babel"]} />
          <SkillItem category="VCS" skills={["git"]} />
          <SkillItem category="Editors" skills={["Vim", "Emacs"]} />
        </div>

        <Title>Experiences</Title>

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
            accomplishments={[
              "Wrote integration tests and unit tests with jest",
              "Worked on react-native based mobile app",
              "Built web app with NextJS",
              "Built admin dashboard with NextJS",
              "Created covid.mn with tailwind and NextJS",
              "Used MaterialUI, GraphQL, NextJS, and tailwind for development",
            ]}
          />
          <CareerItem
            dates="Oct 2018 - Jul 2021"
            name="AND Systems LLC"
            position="Front-End Developer"
            location="Ulaanbaatar (Mongolia)"
            accomplishments={[
              "Developed multiple react-native based mobile apps",
              "Built multiple web apps with ReactJS",
              "Built admin dashboard with NextJS",
              "Created pdf table scraper CLI with nodejs",
              "Created multiple slack bots",
              "Created react-native app builder CI job",
              "Worked on the LendMN app",
              "Developed multiple react-native libraries",
              "Improved code of conduct",
            ]}
          />
          <CareerItem
            dates="Jul 2018 - Oct 2018"
            name="Nomadays LLC"
            position="Front-End Developer"
            location="Ulaanbaatar (Mongolia)"
            accomplishments={["Migrated Angular app to ReactJS"]}
          />
          <CareerItem
            dates="Jan 2017 - Jul 2018"
            name="EYS-STYLE"
            position="Full Stack Developer"
            location="Tokyo (Japan)"
            accomplishments={[
              "Improved tests",
              "Developed custom slack bot",
              "Improved development tool with Google Script",
            ]}
          />
        </div>

        <Title>Educations</Title>

        <div>
          <Text>
            B.S. in Mongolian University of Science and Technology, Ulaanbaatar (2013 - 2018)
          </Text>
          <Text css={{ color: "$gray11" }}>Major in Computer Science, GPA 3.6</Text>
        </div>

        <Title>Honors and Awards</Title>

        <Box as="ul" css={{ listStyle: "inside", color: "$gray11" }}>
          <Text as="li">2018: First place in The HaruulZangi CTF Competition</Text>
          <Text as="li">2019: First place in The HaruulZangi CTF Competition</Text>
          <Text as="li">2020: First place in The Water Mine Hackathon</Text>
        </Box>
      </Page>
    </>
  );
}

export default Home;
