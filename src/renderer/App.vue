<template>
  <div id="app" class="columns">
    <Sidebar></Sidebar>
    <div class="column main-body">
      <router-view />
    </div>
  </div>
</template>

<script>
import store from './store'
import Sidebar from './components/Sidebar'

export default {
  name: 'python-wrangler',
  components: {
    Sidebar
  },
  store,
  mounted () {
    this.$store.dispatch('fetchSystem')
  }
}
</script>

<style lang="scss">
  @import '~@/assets/fonts.css';

  @import "~bulma/sass/utilities/initial-variables";
  @import "~bulma/sass/utilities/functions";

  $lightyellow: #feedba;
  $lightgrey: #F6F7F7;
  $tablet: 0px;
  $logosize: 104px;
  $link: #1ABC9C;
  $warning: $lightyellow;
  $dark: #232B2D;
  $family-monospace: "Inconsolata-webfont";
  $code-size: 0.95em;
  
  @import "~bulma";

  span, p {
      &.is-loading {
          position: relative;
          pointer-events: none;
          opacity: 1;
          padding-left: 1.25em;
          &:after {
              @include loader;
              position: absolute;
              top: 0.25em;
              left: 0;
              width: 1em;
              height: 1em;
          }
      }
  }

  .main-body h1.title {
    margin-left: -12px;
    padding: 15px;
    font-size: 1.5em;
    background: $lightgrey;
    color: $dark;
  }

  .button.is-loading {
    padding-left: 3em;
  }
  
  .button.is-warning {
    color: rgba(0, 0, 0, 0.7) !important;
  }
  
  .button.is-loading:after {
    left: 1em;
  }

  .content pre {
    white-space: pre-wrap;
  }

  aside .button {
    font-size: 0.65em;
  }

  .logo {
    background-size: cover;
    background-image: url('data:image/png;base64,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')
;
    height: $logosize;
    width: $logosize;
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    height: 100%;
  }

  .column.aside {
    padding-top: 2rem;
    padding-right: 1rem;
    padding-left: 1.75rem;
  }

  .column.aside > div {
    top: 2em;
    position: sticky;
  }

  .aside h1 {
    font-size: 1.5em;
    padding: 1rem;
    background: #eee;
    margin-bottom: 15px;
    font-weight: bold;
  }

  .aside {
    background-color: $dark;
  }

  .aside .uploader {
    background-color: #2EB398;
    height: 95px;
    margin:0 -10px;
    padding: 25px 30px;
  }

  .aside .uploader .button {
    background-color: transparent;
    border: 3px dashed $lightgrey;
    padding: 20px 70px;
    color: $lightgrey;
  }

  .aside .main {
    color: $lightgrey;
    padding-top: 1em;
  }

  #app {
    margin-bottom: 0;
  }

  table {
    margin-top: 1em;
    font-size: 0.85em;
  }

  .aside .title {
    color: #6F7B7E;
    padding: 0px 30px;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .aside .main .item {
    display: block;
    padding: 1em;
    color: #6F7B7E;
  }

  .aside .main .item.active {
    color: #F6F7F7;
  }

  .aside .main .icon {
    font-size: 19px;
    padding-right: 30px;
  }

  .aside .main .name {
    font-size: 16px;
    font-weight: bold;
  }

  .aside .header {
    text-align: center;
  }

  .aside .header h1 {
    background: none;
    color: white;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .aside .logo {
    display: block;
    margin: 0 auto;
  }

  .aside .main .item:hover {
    background: #ffc61b;
    color: $dark;
  }

  .aside .title {
    display: none;
  }

</style>
