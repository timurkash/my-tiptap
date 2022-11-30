<script>
import {Editor, EditorContent} from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import {Html} from 'assets/consts'
import {Image} from '@tiptap/extension-image'
import {Underline} from '@tiptap/extension-underline'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import IconItem from './IconItem'
import {getIconItems} from 'assets/article'

const idleIntervalMs = 5000

export default {
  components: {
    EditorContent,
    IconItem,
  },
  data: () => ({
    editor: null,
    iconItems: [],
    savedHtml: null,
    idleInterval: null,
    first: true,
  }),
  mounted() {
    const that = this
    this.editor = new Editor({
      content: Html,
      onUpdate() {
        that.first = false
        if (that.idleInterval) {
          clearTimeout(that.idleInterval)
        }
        that.idleInterval = setTimeout(() => that.save(), idleIntervalMs)
      },
      extensions: [
        StarterKit,
        Image,
        Underline,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        // Default TableCell
        TableCell,
        // Custom TableCell with backgroundColor attribute
        // CustomTableCell,
      ],
    })
    this.iconItems = getIconItems(this.editor)
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  computed: {
    html() {
      if (this.editor) {
        return this.editor.getHTML()
      }
    },
  },
  methods: {
    save() {
      if (this.savedHtml != this.editor.getHTML()) {
        this.savedHtml = this.editor.getHTML()
        // TODO save
        if (this.idleInterval) {
          clearTimeout(this.idleInterval)
        }
      }
    },
  },
}
</script>

<template>
  <div>
    <div class="menu" v-if="editor">
      <template v-for="(item, index) in iconItems">
        <div class="divider" v-if="item.title === 'divider'" :key="`divider${index}`"/>
        <IconItem v-else :key="index" v-bind="item"/>
      </template>
    </div>
    <div class="save-wrapper">
      <div v-show="savedHtml == html" class="saved">Last changes saved</div>
      <button v-show="!first" @click="save" class="save" :disabled="savedHtml == html">save</button>
    </div>
    <editor-content :editor="editor"/>
  </div>
</template>

<style lang="scss">
.menu {
  display: inline-flex;
  flex-wrap: wrap;

  .divider {
    width: 2px;
    height: 1.25rem;
    background-color: rgba(#000, 0.1);
    margin-left: 0.5rem;
    margin-right: 0.75rem;
  }
}

.save-wrapper {
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
  height: 26px;

  .saved {
    font-size: 12px;
    color: gray;
  }

  button {
    border: 1px #ccc solid;
    padding: 0 10px;
    border-radius: 10px;

    &:disabled {
      color: gray;
    }
  }
}

/* Basic editor styles */
.ProseMirror {
  margin: 1rem 0;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}

/* Table-specific styling */
.ProseMirror {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    //th {
    //  font-weight: bold;
    //  text-align: left;
    //  background-color: #666;
    //}

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>
<!--      <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">-->
<!--        insertTable-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">-->
<!--        addColumnBefore-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">-->
<!--        addColumnAfter-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">-->
<!--        deleteColumn-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">-->
<!--        addRowBefore-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">-->
<!--        addRowAfter-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">-->
<!--        deleteRow-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">-->
<!--        deleteTable-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().mergeCells().run()" :disabled="!editor.can().mergeCells()">-->
<!--        mergeCells-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().splitCell().run()" :disabled="!editor.can().splitCell()">-->
<!--        splitCell-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().toggleHeaderColumn().run()" :disabled="!editor.can().toggleHeaderColumn()">-->
<!--        toggleHeaderColumn-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">-->
<!--        toggleHeaderRow-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">-->
<!--        toggleHeaderCell-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">-->
<!--        mergeOrSplit-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()"-->
<!--              :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">-->
<!--        setCellAttribute-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().fixTables().run()" :disabled="!editor.can().fixTables()">-->
<!--        fixTables-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().goToNextCell().run()" :disabled="!editor.can().goToNextCell()">-->
<!--        goToNextCell-->
<!--      </button>-->
<!--      <button @click="editor.chain().focus().goToPreviousCell().run()" :disabled="!editor.can().goToPreviousCell()">-->
<!--        goToPreviousCell-->
<!--      </button>-->

<!--// const CustomTableCell = TableCell.extend({-->
<!--//   addAttributes() {-->
<!--//     return {-->
<!--//       // extend the existing attributes …-->
<!--//       ...this.parent?.(),-->
<!--//-->
<!--//       // and add a new one …-->
<!--//       backgroundColor: {-->
<!--//         default: null,-->
<!--//         parseHTML: element => element.getAttribute('data-background-color'),-->
<!--//         renderHTML: attributes => {-->
<!--//           return {-->
<!--//             'data-background-color': attributes.backgroundColor,-->
<!--//             style: `background-color: ${attributes.backgroundColor}`,-->
<!--//           }-->
<!--//         },-->
<!--//       },-->
<!--//     }-->
<!--//   },-->
<!--// })-->
