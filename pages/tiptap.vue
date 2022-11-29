<script>
import TiptapEditor from '/components/TiptapEditor.vue'
export default {
  components: {
    TiptapEditor
  }
}
</script>

<template>
  <div>
    <client-only>
      <tiptap-editor />
    </client-only>
  </div>
</template>
