# Cells

![gzip size](http://img.badgesize.io/https://unpkg.com/modal-hook/dist/index.js?compression=gzip)
[![npm version](https://img.shields.io/npm/v/modal-hook.svg)](https://www.npmjs.com/package/modal-hook)
[![npm downloads](https://img.shields.io/npm/dm/modal-hook.svg)](https://www.npmjs.com/package/modal-hook)

Cells are visual components for handling data. Each cell performs a single operation such as:

- load data
- filter data
- display a bar chart

Cells can be combined so that, for example, one filter-cell can limit the data shown on several charts-cells.

## Motivation

This tool is meant to turn the ideas, actions, and domain expertise of any worker into something reusable, scalable, searchable. Right now notebooks (like Jupyter) and visual programming (like Luna) have not realized their potential to automating a large amount of human labor. As things currently stand, notebooks and VPLs remain the tools of data scientists and A/V engineers.

Notebooks and VPLs are held back by three things:

- **Poor integrations -** it sucks getting these tools integrated with myriad other tools - that’s a massive slog
- **Required coding knowledge -** that means that users are forced to dip down and do scripting frequently in their workflow. Frequently they don’t know how to do that - so that’s a blocker
- **Inadequate layout options** - notebooks and visual programming UIs have low information density and are outclassed by domain-specific applications which organize their layout in a way that is well-suited to solving specific challenges

All of these problems can be ameliorated and there is significant potential for a product that does address these problems.

## Roadmap

- Notebook layout cell (registers key commands)
- Pipe file-input into SQL
- SQL cell
- Recommendations cell
- Filter cell
- Table cell
- Flex layout (dashboard) cell (registers key commands)
- Fix global key commands

## Install

- **Npm:** `npm install react-cells`
- **Yarn:** `yarn add react-cells`

## Options

See the [examples](https://benshope.github.io/cells) for usage information and snippets to copy.

## Help

If there are any examples you'd like to see or use cases I didn't cover, please [file an issue](https://github.com/benshope/cells/issues/new).
