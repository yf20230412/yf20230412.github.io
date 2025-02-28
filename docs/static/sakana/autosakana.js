// 加载 CSS
$("<link>").attr({
    href: "https://yf1688.top/static/sakana/sakana.min.css",
    rel: "stylesheet",
    type: "text/css"
}).appendTo('head');

// 插入 DIV
$('body').append(`<div id="sakana-widget"></div>`);

// 加载 JS
$.ajax({
    url: 'https://yf1688.top/static/sakana/sakana.min.js',
    dataType: "script",
    cache: true,
    async: false
});

  function initSakanaWidget() {
    new SakanaWidget().mount('#sakana-widget');
  }


/*
<!-- https://cdn.jsdelivr.net/npm/sakana-widget@2.7.0/lib/sakana.min.css -->
<!-- https://cdn.jsdelivr.net/npm/sakana-widget@2.7.0/lib/sakana.min.js -->
<!-- https://cdnjs.cloudflare.com/ajax/libs/sakana-widget/2.7.0/sakana.min.css -->
<!-- https://cdnjs.cloudflare.com/ajax/libs/sakana-widget/2.7.0/sakana.min.js -->

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/sakana-widget@2.7.0/lib/sakana.min.css"
/>
<div id="sakana-widget"></div>
<script>
  function initSakanaWidget() {
    new SakanaWidget().mount('#sakana-widget');
  }
</script>
<script
  async
  onload="initSakanaWidget()"
  src="https://cdn.jsdelivr.net/npm/sakana-widget@2.7.0/lib/sakana.min.js"
></script>
*/