import { useMemo } from "react";

import formatDistanceStrict from "date-fns/formatDistanceStrict";
import parse from "date-fns/parse";

import { Box } from "./Box";
import { Col } from "./Col";
import { Text } from "./Text";

export type CareerItemProps = {
  accomplishments?: string[];
  dates: string;
  location: string;
  name?: string;
  position: string;
};

export function CareerItem({ accomplishments, dates, name, position, location }: CareerItemProps) {
  const dateDistance = useMemo(() => {
    const [startDateStr, endDateStr] = dates.split(" - ");
    const startDate = parse(startDateStr, "LLL yyyy", new Date());
    const endDate = endDateStr === "present" ? null : parse(endDateStr, "LLL yyyy", new Date());

    if (endDate) {
      return ` (${formatDistanceStrict(startDate, endDate, { unit: "month" })})`;
    }

    return "";
  }, [dates]);

  return (
    <Col
      gap={8}
      css={{ "& + &": { mt: "$space$16", pt: "$space$16", borderTop: "1px solid $gray5" } }}
    >
      <Col gap={{ "@initial": 4, "@md": 0 }} direction={{ "@initial": "column", "@md": "row" }}>
        <Text weight="medium">{position}</Text>
        {Boolean(name) && (
          <Text
            weight="bold"
            css={{
              "@md": {
                "&:before": {
                  display: "inline-block",
                  content: "-",
                  mX: "$space$8",
                },
              },
            }}
          >
            {name}
          </Text>
        )}
      </Col>

      <Col gap={{ "@initial": 4, "@md": 0 }} direction={{ "@initial": "column", "@md": "row" }}>
        <Text as="span" css={{ color: "$gray11" }}>{`${dates}${dateDistance}`}</Text>
        <Text
          as="span"
          css={{
            color: "$gray11",
            "@md": {
              "&:before": {
                display: "inline-block",
                content: ",",
                mr: "$space$8",
              },
            },
          }}
          weight="medium"
        >
          {location}
        </Text>
      </Col>

      {accomplishments && (
        <Box as="ul" css={{ listStyle: "inside" }}>
          {accomplishments.map((accomplishment) => (
            <Text key={accomplishment} as="li" size="sm" css={{ color: "$gray11" }}>
              {accomplishment}
            </Text>
          ))}
        </Box>
      )}
    </Col>
  );
}
