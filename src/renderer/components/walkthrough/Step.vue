<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ title }}</p>
    </header>
    <div class="card-content">
      <slot name="extras"></slot>
      <slot v-if="conditional" name="step"></slot>
      <div v-else class="content"><p>Waiting for data...</p></div>
      <div class="has-text-centered" v-if="refresher">
        <a v-if="loading" class="button is-warning is-loading">
          <strong>Refreshing...</strong>
        </a>
        <a v-else-if="completed" v-on:click="refresher" class="button is-success">
          <strong>Complete</strong>
        </a>
        <a v-else v-on:click="refresher" class="button is-warning">
          <strong>Step incomplete</strong>, click to refresh
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'conditional',
    'refresher',
    'title',
    'completed',
    'loading'
  ]
}
</script>
