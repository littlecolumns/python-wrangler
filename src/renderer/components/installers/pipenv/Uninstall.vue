<template>
  <div class="content">
    <p>If you'd like to remove a pipenv Python permanently, you'll need to remove the folder it's located in.</p>
    <p v-if="python">This particular Python lives in <FileLink :folder="python.basepath"></FileLink>, so if you delete that folder this Python will disappear.</p>
    <p>If you remove a Python that a virtual environment is using somewhere, you're sure to get an error about it next time you try to use that virtual enviroment. But don't worry, you can always install that Python again — pipenv is pretty nice about those things.</p>
  </div>
</template>

<script>
import FileLink from '../../FileLink'

export default {
  components: {
    FileLink
  },
  props: [ 'python' ]
}
</script>

<style>
</style>
