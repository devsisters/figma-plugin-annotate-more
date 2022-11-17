declare global {
  // Text Editor
  type Mark = { type: 'bold' | 'italic' | 'strike' | 'underline' | 'link' | 'textStyle', attrs: any }
  type Attrs = { order: number, href: HyperlinkTarget, target: string }
  type ContentBlock = {
    type: 'paragraph' | 'text' | 'hard_break' | 'bullet_list' | 'ordered_list' | 'horizontal_rule',
    content?: ContentBlock[],
    attrs?: Attrs,
    text?: string,
    marks?: Mark[]
  }

  // Annotations
  type Annotation = {
    colorThemeId: string,
    content: ContentBlock[],
    id: string,
    isDeleted: boolean,
    title: string
  }

  type AnnotWrapperPluginData = {
    connectedFrameId: string,
    connectedFrameAliasName: string
  }
}


export {
  Mark,
  Attrs,
  ContentBlock,
  Annotation,
  AnnotWrapperPluginData
}