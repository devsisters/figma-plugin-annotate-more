<template>
  <div class="editor">
    <bubble-menu
        :editor="editor"
        :tippy-options="{ duration: 100 }"
        v-if="editor"
    >
      <input
          type="color"
          @input="editor.chain().focus().setColor($event.target.value).run()"
          :value="editor.getAttributes('textStyle').color"
      >
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
    </bubble-menu>

    <editor-content class="editor-content" :editor="editor" />
  </div>
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import { BubbleMenu, Editor, EditorContent } from '@tiptap/vue-2'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'

export default {
  props: {
    value: Array,
  },

  components: {
    EditorContent,
    BubbleMenu,
  },

  data() {
    return {
      editor: null,
      isEditable: true,
    }
  },

  watch: {
    isEditable(value) {
      this.editor.setEditable(value)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextStyle,
        Color,
      ],
      content: {
        type: 'doc',
        content: this.value,
      },
    })

    this.editor.on('update', ({ editor }) => {
      this.value = editor.getJSON().content;
      this.$emit('input', this.value);
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss" scoped>
  .editor ::v-deep p.is-editor-empty:first-child::before {
    content: attr(data-empty-text);
    color: $color--black-3;
    pointer-events: none;
    height: 0;
    position: absolute;
    width: 100%;
  }

  .editor {
    position: relative;

    &-floatingMenu, &-menuBubble {
      position: absolute;
      visibility: hidden;
      opacity: 0;
      transition: opacity 150ms, visibility 150ms;

      &.is-active {
        opacity: 1;
        visibility: visible;
      }

      button {
        display: inline-flex;
        background: transparent;
        border: 0;
        margin-right: 0.25rem;
        border-radius: 2px;
        cursor: pointer;
        color: white;
        transition: background-color 150ms ease;
        height: 24px;
        width: 24px;
        justify-content: center;
        align-items: center;
        padding: 0;

        svg {
          height: 24px;
          width: 24px;
        }

        * {
          color: white;
          @include font(12);
        }

        b {
          font-weight: bold;
        }

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          background-color: rgba(#fff, 0.15);
        }

        &.is-active {
          background-color: rgba(#fff, 0.25);
        }
      }
    }

    &-floatingMenu {
      // needed
      z-index: 1;
      margin-top: -0.5rem;
      right: 8px;

      // visual styling
      display: flex;
      margin-top: -.25rem;

      button {
        padding: 0;
        opacity: .75;
        transition: opacity 150ms ease;
        color: #fff;

        &:hover {
          opacity: 1;
        }
      }
    }

    &-menuBubble {
      // needed
      z-index: 20;
      transform: translateX(-50%);

      // visual styling
      display: flex;
      background: #000;
      border-radius: 3px;
      padding: 0.3rem;
      margin-bottom: 0.5rem;
    }

    &-content {
      ::v-deep {
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;

        * {
          caret-color: currentColor;
        }

        ul,
        ol {
          padding-left: 1rem;
          margin: 0;
        }

        ul > li > ul, 
        ul > li > ul * {
          list-style-type: circle;
        }

        li > p,
        li > ol,
        li > ul {
          margin: 0;
        }

        a {
          color: inherit;
        }

        hr {
          margin: .5rem 0;
          height: 2px;
          border: none;
          border-radius: 2px;
          background: $color--background-grey-f0;
        }
      }
    }
  }
</style>