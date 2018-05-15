<template>
  <span v-on:click="openPath" class='open-path'>
    <code v-if="!hide">
      {{ path || folder }}
      <a class="open-file is-small">
        <font-awesome-icon :icon="['fas', 'external-link-square-alt']" />
<!--         <span class="desc">Open</span>
 -->      </a>
    </code>
  </span>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { shell } from 'electron'
import { join } from 'path'

export default {
  components: {
    FontAwesomeIcon
  },
  props: [ 'path', 'show', 'folder', 'hide', 'openInto' ],
  methods: {
    openFunction (target) {
      if (this.openInto) {
        return shell.openItem(target)
      } else {
        return shell.showItemInFolder(target)
      }
    },
    openPath () {
      let target = this.path || this.folder

      if (target[0] === '~') {
        target = join(process.env.HOME, target.slice(1))
      }

      if (this.folder) {
        this.openFunction(target + '/')
      } else {
        this.openFunction(target)
      }
    }
  }
}
</script>

<style>
  .open-path .desc {
    display: none;
    font-size: 0.75rem;
  }
  .open-path:hover .desc {
    display: inline;
  }
  .open-path .fa {
    vertical-align: baseline;
  }
  .open-path {
    cursor: pointer;
  }
  .open-file:after {
    display: none;
    content: ' Show';
  }
  .open-path:hover .open-file:after {
    display: inline;
  }
</style>
