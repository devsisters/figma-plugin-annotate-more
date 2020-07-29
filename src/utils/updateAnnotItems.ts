import { 
  generateAnnotItemNode, 
  getAnnotWrapperNode, 
  setPluginData, 
  updateAnnotItemsBadgeIndex,
  generateAnnotItemTitleOptions
} from '@/utils/figmaUtils'
import { config } from '@/utils/utils'
import contentBlockToNode from '@/utils/contentBlockToNode'
import createAnnotDiff from '@/utils/createAnnotDiff'


export default ( newAnnots: Annotation[], oldAnnots: Annotation[] ) => {
  const annotWrapperNode = getAnnotWrapperNode(),
        diff = createAnnotDiff(newAnnots, oldAnnots),
        annotArr = diff._

  console.clear()

  // Handle annotation items reordering
  if (diff.changes > 1) {
    for (let i = 0; i < annotArr.length; i++) {
      const annotDiffObj = annotArr[i]

      // Get the existing node
      const node = annotWrapperNode.findChild(node => node.name.includes(annotDiffObj._.id.current))  
      annotWrapperNode.appendChild(node)
    }

    // Update the badge's indexes
    updateAnnotItemsBadgeIndex(annotWrapperNode)

    return
  }

  // Loop through array of diff objects
  for (let i = 0; i < annotArr.length; i++) {
    const annotDiffObj = annotArr[i]
    
    switch (annotDiffObj.status) {
      case 'ADDED': {
        const { current: newItem } = annotDiffObj

        // Get index for annotation badge
        const annotationIndex = annotWrapperNode.children.length + 1
        annotWrapperNode.appendChild(generateAnnotItemNode(newItem, annotationIndex))

        break
      }

      case 'MODIFIED': {
        const { _: item } = annotDiffObj

        if (item.isDeleted.current === true)
          _deleteAnnotItem(item, annotWrapperNode)
        else {
          // Update annot item
          const annotNode = <FrameNode>annotWrapperNode.findChild(node => node.name.includes(item.id.original))

          // Save the "real" modified annot item object (wihout diff-things)
          const modifiedItemWithoutDiff = newAnnots[i]
          setPluginData(annotNode, config.annotItemNodePluginDataKey, modifiedItemWithoutDiff)

          let doneChanges = 0

          // Loop through item entries (id, title, content, ...)
          for (let entryName of Object.keys(item)) {
            const { changes, current: newValue, original: oldValue } = item[entryName]
            if (!changes)
              continue

            switch (entryName) {
              // case 'id':
              //   // id has changed. This is caused by the re-arrangement of the items order in the UI.
              //   console.log('id of', annotNode.name, 'has changed. replace', oldValue, 'with', newValue)
              //   annotNode.name = annotNode.name.replace(oldValue, newValue)

              case 'title':
                const titleNode = <TextNode>annotNode.findOne(node => node.name === 'Header/Text'),
                      titleOptions = generateAnnotItemTitleOptions(newValue)
                titleNode.characters = titleOptions.characters
                titleNode.opacity = titleOptions.opacity
                break
            
              case 'content':
                _handleModifiedItemContent(annotDiffObj, entryName, annotNode)
                break
            }

            console.log(`Detected a change in ${entryName}`)

            doneChanges++
            if (doneChanges === annotDiffObj.changes)
              break
          }
        }

        break
      } // end case 'MODIFIED'
    } // end switch
  } // end for (... of ...)
}


const _deleteAnnotItem = ( deletedItem: any, annotWrapperNode: FrameNode ) => {
  const annotNode = <FrameNode>annotWrapperNode.findChild(node => node.name.includes(deletedItem.id.current))

  annotNode.remove()

  // If the annotWrapper node is empty after removing the itemNode, remove the wrapper too.
  if (annotWrapperNode.children.length === 0)
    annotWrapperNode.remove()

  // Update the badge's indexes
  updateAnnotItemsBadgeIndex(annotWrapperNode)
}


const _handleModifiedItemContent = ( item: any, entryName: string, annotNode: FrameNode ) => {
  const bodyNode = <FrameNode>annotNode.findChild(node => node.name === 'Body')

  const diffObj = item._[entryName],
        contentBlockArr = diffObj._,
        contentBlocksAmount = contentBlockArr.filter(b => b.status !== 'DELETED').length

  let doneContentChanges = 0,
      expectedContentChanges = diffObj.changes,
      figmaNodeListIndex = -1

  for (let i = 0; i < contentBlockArr.length; i++) {
    figmaNodeListIndex++

    const contentBlock = contentBlockArr[i]
    if (!contentBlock.changes)
      continue

    switch (contentBlock.status) {
      case 'ADDED':
        const newContentBlock = _generateSafeAddedContentBlock(contentBlock.current),
              newNode = contentBlockToNode({ contentBlock: newContentBlock, contentBlocksAmount })

        // console.log(`ADDED (line ${i + 1})`, newContentBlock)
        bodyNode.insertChild(figmaNodeListIndex, newNode)
        break
    
      case 'DELETED':
        // console.log(`REMOVED (line ${i + 1})`, contentBlock)
        bodyNode.children[figmaNodeListIndex].remove()
        figmaNodeListIndex--
        break
        
      case 'MODIFIED':
        const modifiedContentBlock = _generateSafeModifiedContentBlock(contentBlock),
              modifiedNode = contentBlockToNode({ contentBlock: modifiedContentBlock, contentBlocksAmount })

        // console.log(`MODIFIED (on line ${i + 1})`, modifiedContentBlock)
        bodyNode.children[figmaNodeListIndex].remove()
        bodyNode.insertChild(figmaNodeListIndex, modifiedNode)
        break
    }

    doneContentChanges++
    if (doneContentChanges === expectedContentChanges)
      break
  }
}


const _generateSafeAddedContentBlock = ( contentBlock: any ) => {
  return { 
    ...contentBlock, 
    content: contentBlock?.content 
      ? JSON.parse(contentBlock.content) // when content is already something
      : config.defaultParagraphBlockContent // when content is undefined
  }
}


const _generateSafeModifiedContentBlock = ( contentBlock: any ) => {
  return {
    type: contentBlock._.type.current,
    content: contentBlock._.content.current
      ? JSON.parse(contentBlock._.content.current) // when content is already something
      : config.defaultParagraphBlockContent // when content is undefined
  }
}