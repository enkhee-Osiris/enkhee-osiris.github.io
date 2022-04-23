import React, { forwardRef, useCallback, useMemo } from "react";

import clsx from "clsx";
import {
  ActionImpl,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarResultsProps,
  KBarSearch,
  useMatches,
  useRegisterActions,
} from "kbar";
import { useRouter } from "next/router";
import { useDarkMode } from "usehooks-ts";

import { Box } from "./Box";
import { Col } from "./Col";
import { Grid } from "./Grid";
import { Icon } from "./Icon";
import { Row } from "./Row";
import { css, styled } from "./stitches.config";

const animator = css({
  background: "$gray1",
  borderRadius: "8px",
  color: "$gray12",
  fontFamily: "'IBM Plex Sans', sans-serif",
  maxWidth: "600px",
  overflow: "hidden",
  width: "100%",

  ".light-theme &": {
    boxShadow: "0px 4px 6px $colors$gray8",
  },
});

const search = css({
  background: "$gray2",
  border: "none",
  color: "$gray12",
  fontFamily: "'IBM Plex Sans', sans-serif",
  fontSize: "16px",
  lineHeight: "24px",
  outline: "none",
  pX: "$space$24",
  pY: "$space$16",
  width: "100%",
});

const SectionHeader = styled("div", Box, {
  color: "$gray9",
  fontFamily: "'IBM Plex Sans', sans-serif",
  fontSize: "12px",
  pX: "$space$16",
  pY: "$space$8",
  textTransform: "uppercase",
});

const ItemContainer = styled("div", {
  alignItems: "center",
  background: "transparent",
  borderLeft: "2px solid transparent",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  pX: "$space$16",
  pY: "$space$8",

  "&.active": {
    background: "$gray2",
    borderLeft: "2px solid $gray12",
  },
});

const Title = styled("span", {
  color: "$gray12",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "24px",
});

const AncestorName = styled("span", {
  color: "$gray11",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "24px",
});

const Subtitle = styled("span", {
  color: "$gray11",
  fontSize: "14px",
  lineHeight: "22px",
});

const StyledKbd = styled("kbd", {
  background: "$gray4",
  borderRadius: "$space$4",
  fontSize: 14,
  pX: "$space$8",
  pY: "$space$4",
});

function ItemAncestor({ name }: { name: string }) {
  return (
    <>
      <AncestorName>{name}</AncestorName>
      <Icon css={{ color: "$gray12" }} size={19} name="arrow-right" />
    </>
  );
}

const ResultItem = forwardRef(
  (
    {
      action,
      active,
      currentRootActionId,
    }: { action: ActionImpl; active: boolean; currentRootActionId: string | null | undefined },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const ancestors = useMemo(() => {
      if (!currentRootActionId) return action.ancestors;
      const index = action.ancestors.findIndex((ancestor) => ancestor.id === currentRootActionId);
      // +1 removes the currentRootAction; e.g.
      // if we are on the "Set theme" parent action,
      // the UI should not display "Set theme… > Dark"
      // but rather just "Dark"
      return action.ancestors.slice(index + 1);
    }, [action.ancestors, currentRootActionId]);

    return (
      <ItemContainer ref={ref} className={clsx(active && "active")}>
        <Row gap={8} align="center">
          {action.icon && action.icon}

          <Col>
            <Row gap={8} align="center">
              {ancestors.length > 0 &&
                ancestors.map((ancestor) => (
                  <ItemAncestor key={ancestor.id} name={ancestor.name} />
                ))}
              <Title>{action.name}</Title>
            </Row>

            {action.subtitle && <Subtitle>{action.subtitle}</Subtitle>}
          </Col>
        </Row>
        {action.shortcut?.length && (
          <Grid aria-hidden flow="column" gap={4}>
            {action.shortcut.map((sc) => (
              <StyledKbd key={sc}>{sc}</StyledKbd>
            ))}
          </Grid>
        )}
      </ItemContainer>
    );
  }
);

function RenderResults() {
  const { results, rootActionId } = useMatches();

  const handleRender: KBarResultsProps["onRender"] = useCallback(
    ({ item, active }) => {
      if (typeof item === "string") {
        return <SectionHeader>{item}</SectionHeader>;
      }

      return <ResultItem action={item} active={active} currentRootActionId={rootActionId} />;
    },
    [rootActionId]
  );

  return <KBarResults items={results} onRender={handleRender} />;
}

function ThemeActions() {
  const { enable, disable } = useDarkMode(true);

  useRegisterActions(
    [
      {
        id: "theme",
        name: "Change theme",
        keywords: "theme interface color dark light",
        section: "Preferences",
      },
      {
        id: "darkTheme",
        name: "Dark",
        keywords: "dark theme",
        section: "",
        perform: enable,
        parent: "theme",
      },
      {
        id: "lightTheme",
        name: "Light",
        keywords: "light theme",
        section: "",
        perform: disable,
        parent: "theme",
      },
    ],
    [enable, disable]
  );

  return null;
}

export function CommandBarProvider({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();

  const handleHomeAction = useCallback(() => {
    push("/");
  }, [push]);

  const handleAboutAction = useCallback(() => {
    push("/about");
  }, [push]);

  const handleBlogsAction = useCallback(() => {
    push("/blogs");
  }, [push]);

  const handleResumeAction = useCallback(() => {
    push("/resume");
  }, [push]);

  const handleConnectAction = useCallback(() => {
    push("/connect");
  }, [push]);

  const actions = useMemo(
    () => [
      {
        id: "homeAction",
        name: "Home",
        shortcut: ["h"],
        keywords: "back",
        section: "Navigation",
        perform: handleHomeAction,
      },
      {
        id: "aboutAction",
        name: "About",
        shortcut: ["a"],
        keywords: "who enkhee osiris",
        section: "Navigation",
        perform: handleAboutAction,
      },
      {
        id: "blogsAction",
        name: "Blogs",
        shortcut: ["b"],
        keywords: "write note",
        section: "Navigation",
        perform: handleBlogsAction,
      },
      {
        id: "resumeAction",
        name: "Resume",
        shortcut: ["r"],
        keywords: "education experiences",
        section: "Navigation",
        perform: handleResumeAction,
      },
      {
        id: "connectAction",
        name: "Connect",
        shortcut: ["c"],
        keywords: "contact info email hello",
        section: "Navigation",
        perform: handleConnectAction,
      },
    ],
    [
      handleHomeAction,
      handleAboutAction,
      handleBlogsAction,
      handleResumeAction,
      handleConnectAction,
    ]
  );

  return (
    <KBarProvider actions={actions}>
      <ThemeActions />

      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator className={animator()}>
            <KBarSearch className={search()} />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>

      {children}
    </KBarProvider>
  );
}
