<template>
  <div class="content">
    <p>Anaconda is Python + a ton of science-y/data-y tools, all packaged together. Installing those tools individually can be a real pain, so Anaconda is a quick way to get a fully-featured Python installation.</p>

    <div v-if="!basics">
      <p><strong>UPSIDES</strong></p>
      <ul class="list">
        <li>If you work in data analysis or science (like <em>astrophysics</em> science, not computer science), Anaconda has all of the complicated-to-install pieces already there. Scientists love using Anaconda, so everyone will know exactly what you're talking about when you mention it.</li>
        <li>You also don't need to spend any time on the command line (which many would actually call a downside, I suppose!).</li>
      </ul>

      <p><strong>DOWNSIDES</strong></p>
      <ul class="list">
        <li>If you don't work in academia/science, most people don't use Anaconda, so you might end up a little bit stranded. Also, when you're googling for answers you'll come across a lot of people talking about using <code>pip</code> or <code>virtualenv</code> to manage Python-y things on your computer, and you'll say <em>what are those?</em></li>

        <li>Y'see, Anaconda puts a new tool on top of Python - called <code>conda</code> - which is <em>kind of</em> a replacement for the standard installing-Python-things tool <code>pip</code> and the keeping-things-organized tool <code>virtualenv</code>. It was written back when <code>pip</code> was terrible, but modern-day <code>pip</code> is fine for most everyone. While <code>conda</code> is great in some specific situations, juggling the two can be confusing.</li>
      </ul>

      <p><strong>RECOMMENDATION</strong></p>
      <ul class="list">
        <li>If you work in science or data analysis, <strong>go for Anaconda</strong>, it's convenient and what (most) everyone uses.</li>
        <li>If you're coding for the web, <strong>don't use Anaconda.</strong> It isn't for that kind of stuff.</li>
        <li>If you're just starting out and don't know what the heck you're doing, I recommend you keep things simple and <strong>skip Anaconda</strong>. You can always install it later.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['basics']
}
</script>

<style>
</style>
