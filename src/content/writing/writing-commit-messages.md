---
title: "The Commit Message Is Documentation"
description: "A commit log is a history of intent. Writing it well is one of the highest-leverage habits in software development."
pubDatetime: 2025-07-08T00:00:00.000Z
tags: ["dummy", "guide", "engineering"]
---

Most developers treat commit messages as a formality. Something to write so the CI pipeline moves. But a commit history is documentation — the only record of why the code looks the way it does.

## The Archaeology Problem

You're debugging a production issue at 11pm. The bug is in code you didn't write. You find the relevant commit. The message says "fix stuff."

This is the archaeology problem. Code tells you what the system does. The commit log tells you why it does it that way. Without good messages, you're reading ruins — structure without context.

A good message at the moment of writing costs two minutes. Finding context without one costs much more.

## Subject and Body

The conventional format exists for a reason. A short subject line (under 72 characters) summarizes the change. An optional body explains the motivation.

```
Limit tag names to lowercase letters and hyphens

Tag names were previously unconstrained, which allowed values like
"Design Systems" and "CSS3". These caused inconsistent URL slugs and
broke the tag filter logic which assumed lowercase.

Validation now happens at the schema level so Astro catches invalid
tags at build time rather than silently generating broken pages.
```

The subject answers "what changed." The body answers "why" and "what else you should know." The diff tells you "how."

Don't repeat what the diff shows. Explain what the diff can't.

## Tense and Voice

The convention is imperative mood, present tense: "Add feature" not "Added feature" or "Adds feature." This reads as an instruction — if you apply this commit, it will add the feature.

This isn't a style preference. It matches the way Git itself writes messages ("Merge branch", "Revert commit") and makes commits readable as a sequence of instructions in the log.

## Atomicity

A commit should represent one coherent change. Not "all my work today." Not "WIP before I go home."

Atomic commits have two benefits. First, they're easier to understand in isolation. Second, they're easier to revert. A commit that fixes a bug and adds a feature can't be selectively reverted. A commit that does one thing can.

The pressure to make clean atomic commits also improves the work itself. If you can't write a one-line subject for a commit, the change might be doing too much.

## The Log as Narrative

A well-maintained commit history tells a story. You can see why a feature was built, when a decision was reconsidered, what problem a refactor was solving. This is valuable for future contributors, but also for yourself.

Reading your own commit log from six months ago reveals how your thinking evolved. It's the closest thing software development has to a lab notebook.

Write for the person who will read this in two years. They may be you.
