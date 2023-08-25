import React, { ReactNode } from "react"
import { MARKS, BLOCKS, INLINES } from "@contentful/rich-text-types"
import { Block, Inline } from "@contentful/rich-text-types"
import { Options } from "@contentful/rich-text-react-renderer"

export const richTextOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => {
      return <span className="font-bold">{text}</span>
    },
    [MARKS.ITALIC]: (text: ReactNode) => {
      return <span className="italic">{text}</span>
    },
  },
  renderNode: {
    [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
      <h2>{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
      <h3>{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
      <h4>{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_node: Block | Inline, children: ReactNode) => (
      <h5>{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_node: Block | Inline, children: ReactNode) => (
      <h6>{children}</h6>
    ),
    [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
      <p className="mb-4">{children}</p>
    ),
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      return (
        <a href={node.data.uri} className="text-orange-500 font-medium">
          {children}
        </a>
      )
    },
    [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
      <ul className="list-disc mb-4 ml-8">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => {
      return <li>{children}</li>
    },
  },
}
