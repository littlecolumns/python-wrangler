<template>
  <span>
    {{ displayDate }}
  </span>
</template>

<script>
export default {
  props: ['time'],
  computed: {
    displayDate () {
      var date = new Date(this.time * 1000)
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()
      // var hour = date.getHours()
      // var minutes = date.getMinutes()
      // var meridian = 'AM'

      // if (hour > 11) {
      //   meridian = 'PM'
      //   if (hour > 12) {
      //     hour = hour - 12
      //   }
      // }
      // var combined = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ' ' + meridian
      var combined = year + '-' + month + '-' + day

      return combined.replace(/\b(\d)\b/g, '0$1')
    }
  }
}
</script>
