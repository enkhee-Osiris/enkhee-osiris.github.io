import { Page, Text } from "@enkhee-Osiris/ui";
import Head from "next/head";

import BOOKMARKS from "@/constants/bookmarks.json";

function BookmarkItem({
  name,
  links,
}: {
  name: string;
  links: { name: string; url: string; description: string }[];
}) {
  return (
    <>
      <Text as="dt" size="xl" weight="bold" css={{ mY: "$space$16" }}>
        {name}
      </Text>
      {links.map(({ name: linkName, url, description }) => (
        <dd>
          <Text
            as="a"
            href={url}
            weight="medium"
            css={{ "&:hover, &:active": { color: "$orange10" } }}
          >
            {linkName}
            <Text as="span" css={{ color: "$gray11" }}>{` - ${description}`}</Text>
          </Text>
        </dd>
      ))}
    </>
  );
}

export default function Bookmarks({ bookmarks }: { bookmarks: typeof BOOKMARKS }) {
  return (
    <>
      <Head>
        <title>Bookmarks ▮ enkhee-Osiris</title>
      </Head>

      <Page heading="Bookmarks">
        <dl>
          {bookmarks.map(({ name, links }) => (
            <BookmarkItem key={name} name={name} links={links} />
          ))}
        </dl>
      </Page>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { bookmarks: BOOKMARKS },
  };
}
