
export function getIconItems(editor) {
  return [
    {
      title: 'bold',
      action: () => editor.chain().focus().toggleBold().run(),
      disabled: () => !editor.can().chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      title: 'italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      disabled: () => !editor.can().chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      title: 'underline',
      action: () => editor.chain().focus().toggleUnderline().run(),
      disabled: () => !editor.can().chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive('underline'),
    },
    {
      title: 'strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      disabled: () => !editor.can().chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      title: 'code',
      action: () => editor.chain().focus().toggleCode().run(),
      disabled: () => !editor.can().chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      title: 'clear',
      action: () => editor.chain().focus().unsetAllMarks().run(),
    },
    {
      title: "divider"
    },
    {
      title: 'paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      title: 'h-1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      title: 'h-2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      title: 'h-3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      title: 'h-4',
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.isActive('heading', { level: 4 }),
    },
    {
      title: 'h-5',
      action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      isActive: () => editor.isActive('heading', { level: 5 }),
    },
    {
      title: 'h-6',
      action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      isActive: () => editor.isActive('heading', { level: 6 }),
    },
    {
      title: 'ul',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      title: 'ol',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      title: 'code-box',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      title: 'quotes',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      title: 'clear-nodes',
      action: () => editor.chain().focus().clearNodes().run(),
    },
    {
      title: "divider"
    },
    {
      title: 'separator',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      title: 'text-wrap',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      title: "divider"
    },
    {
      title: 'undo',
      action: () => editor.chain().focus().undo().run(),
      disabled: () => !editor.can().chain().focus().undo().run(),
    },
    {
      title: 'redo',
      action: () => editor.chain().focus().redo().run(),
      disabled: () => !editor.can().chain().focus().redo().run(),
    },
  ]

}
