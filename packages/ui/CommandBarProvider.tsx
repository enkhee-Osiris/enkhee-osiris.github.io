/* eslint-disable max-lines */
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
import { Action } from "kbar/types";
import { useRouter } from "next/router";
import { useDarkMode } from "usehooks-ts";

import { Box } from "./Box";
import { Col } from "./Col";
import { Grid } from "./Grid";
import { Icon } from "./Icon";
import { Row } from "./Row";
import { css, styled } from "./stitches.config";

const animator = css({
  background: "$gray2",
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
  background: "$gray3",
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
  color: "$gray12",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  pX: "$space$16",
  pY: "$space$8",

  "&.active": {
    background: "$gray3",
    borderLeft: "2px solid $gray12",
  },
});

const Title = styled("span", {
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
          <Grid
            css={{ display: "none", "@lg": { display: "grid" } }}
            aria-hidden
            flow="column"
            gap={4}
          >
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
        if (item === "") {
          return null;
        }

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
  const { basePath, push } = useRouter();

  const handleHomeAction = useCallback(() => {
    if (basePath === "") {
      push("/");
    } else {
      window.location.pathname = "/";
    }
  }, [basePath, push]);

  const handleAboutAction = useCallback(() => {
    if (basePath === "") {
      push("/about");
    } else {
      window.location.pathname = "/about";
    }
  }, [basePath, push]);

  const handleBlogsAction = useCallback(() => {
    if (basePath === "/blogs") {
      push("/");
    } else {
      window.location.pathname = "/blogs";
    }
  }, [basePath, push]);

  const handleProjectAction = useCallback(() => {
    if (basePath === "") {
      push("/projects");
    } else {
      window.location.pathname = "/projects";
    }
  }, [basePath, push]);

  const handleResumeAction = useCallback(() => {
    if (basePath === "/resume") {
      push("/");
    } else {
      window.location.pathname = "/resume";
    }
  }, [basePath, push]);

  const handleConnectAction = useCallback(() => {
    if (basePath === "") {
      push("/connect");
    } else {
      window.location.pathname = "/connect";
    }
  }, [basePath, push]);

  const actions: Action[] = useMemo(
    () => [
      {
        id: "homeAction",
        name: "Home",
        shortcut: ["h"],
        keywords: "back",
        section: "Navigation",
        perform: handleHomeAction,
        icon: <Icon name="home" size={20} />,
      },
      {
        id: "aboutAction",
        name: "About",
        shortcut: ["a"],
        keywords: "who enkhee osiris",
        section: "Navigation",
        perform: handleAboutAction,
        icon: <Icon name="person" size={20} />,
      },
      {
        id: "blogsAction",
        name: "Blogs",
        shortcut: ["b"],
        keywords: "write note",
        section: "Navigation",
        perform: handleBlogsAction,
        icon: <Icon name="document" size={20} />,
      },
      {
        id: "projectsAction",
        name: "Projects",
        shortcut: ["p"],
        keywords: "hobby",
        section: "Navigation",
        perform: handleProjectAction,
        icon: <Icon name="folder" size={20} />,
      },
      {
        id: "resumeAction",
        name: "Resume",
        shortcut: ["r"],
        keywords: "education experiences",
        section: "Navigation",
        perform: handleResumeAction,
        icon: <Icon name="person-work" size={20} />,
      },
      {
        id: "connectAction",
        name: "Connect",
        shortcut: ["c"],
        keywords: "contact info email hello",
        section: "Navigation",
        perform: handleConnectAction,
        icon: <Icon name="email" size={20} />,
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
    <KBarProvider
      actions={actions}
      options={{
        disableDocumentLock: false,
        disableScrollbarManagement: true,
        enableHistory: false,
      }}
    >
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
