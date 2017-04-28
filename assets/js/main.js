
(function(window) {
  var menu = [
    {
      title: 'Native',
      url: 'apps/native/index.html'
    },
    {
      title: 'jQuery',
      url: 'apps/jquery/index.html'
    }
  ];

  function App(event) {
    var $menu = $('#menu');
    var $frame = $('#frame');

    menu.forEach(function(menuItem, index) {
      var $item = $('<li/>');
      var $itemLink = $('<a/>');

      $itemLink.attr('href', menuItem.url);
      $itemLink.html(menuItem.title);
      $itemLink.click(function(event) {
        event.preventDefault();
        $frame.attr('src', menuItem.url);
        $menu.children('li').removeClass('active');
        $item.addClass('active');
      });

      $item.append($itemLink);
      $menu.append($item);
    });

    $menu.children('li:first-child')
      .find('a')
      .click();
  }

  window.onload = App;
})(window)
