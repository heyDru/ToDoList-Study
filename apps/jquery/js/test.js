
document.getElementById('h1').addEventListener('click', function(event) {
  console.info('h1', event);
});

document.getElementById('h2').addEventListener('click', function(event) {
  console.info('h2', event);
});

document.getElementById('h3').addEventListener('click', function(event) {
  console.info('h3', event);
});

var d = document;
var div = document.createElement('div');
div.innerHTML = 'Hello World!';
div.style.position = 'absolute';
d.body.appendChild(div);

d.addEventListener('mousemove', function(event) {
  div.style.left = event.pageX + 'px';
  div.style.top = event.pageY + 'px';
});

var evt = new Event('click');
document.getElementById('h2').dispatchEvent(evt);

function AppEvents() {

}

AppEvents.prototype.sub = function(type, callback) {
  console.info('sub', type);
  callback(type);
};

var appEvents = new AppEvents();
appEvents.sub('create', function(type) {
  console.info('callback', type);
});

(function(w, d) {
  function Core() {

  }

  Core.prototype.create = function(type) {

  };

  var core = new Core();
  w.CORE = core;

  console.info(w.CORE);
})(window, document);

(function(w, d) {
  w.CORE.asd = 'asd';
  console.info(w.CORE);
})(window, document);


