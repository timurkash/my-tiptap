<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    disabled: {
      type: Function,
      default: null,
    },
    isActive: {
      type: Function,
      default: null,
    },
  },
  computed: {
    getDis() {
      if (this.disabled) {
        if (this.disabled()) {
          return "-dis"
        }
        return ""
      }
      return ""
    },
  },
}
</script>

<template>
  <button @click="action"
          :disabled="disabled ? disabled(): null"
          :class="{ 'is-active': isActive ? isActive(): null }"
          class="button">
    <img :src="require(`/assets/image/svg/article/${title.toLowerCase()}${getDis}.svg`)" :alt="title" :title="title" class="icon"/>
  </button>
</template>

<style lang="scss">
img {
  svg {
    path {
      fill-opacity: 0.1;
    }
  }
}
.menu {
  display: inline-flex;

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px grey solid;
    padding: 0 5px;
    border-radius: 5px;
    background: #FFFFFF;
    margin: 3px 2px;
    width: 40px;
    height: 32px;

    &:disabled {
      border: 1px #ccc solid;
      background-color: #ccc;

      svg path {
        fill: red;
      }
    }

    .icon {
      width: 20px;
      height: 20px;
      background-color: transparent;

    }

    &.is-active {
      background-color: #aaa;
    }
  }
}
</style>
