(function () {

  /*show and hidden header navigation*/

  const headerButton = document.querySelector('.header__button');
  const navigationList = document.querySelector('.navigation__list');
  const headerContact = document.querySelector('.header__contact');

  const toggleHeaderButton = () => headerButton.classList.toggle('header__button--open');

  const showOrHiddenNavigation = () => navigationList.classList.toggle('navigation__list--open');

  const moveDownHeaderContact = () => headerContact.classList.toggle('header__contact--open');

  headerButton.addEventListener('click', () => {
    toggleHeaderButton();
    showOrHiddenNavigation();
    moveDownHeaderContact();
  });

  /*map*/

  const map = document.querySelector('.map__wrapper');
  const mapCoord = [59.938635, 30.323118];
  let mapCoordCenter = [59.938695, 30.323255];
  let mapZoom = 17;
  let mapIconImageOffset = [8, -152];
  const TABLE_MAX_WIDTH = 1199;
  const MOBILE_MAX_WIDTH = 767;

  if (window.matchMedia('(max-width: ' + TABLE_MAX_WIDTH + 'px)').matches) {
    mapCoordCenter = [59.938595, 30.323355];
    mapZoom = 16;
    mapIconImageOffset = [-20, -59];

    if (window.matchMedia('(max-width: ' + MOBILE_MAX_WIDTH + 'px)').matches) {
      mapCoordCenter = [59.938855, 30.323955];
      mapZoom = 15;
      mapIconImageOffset = [-20, -59];
    }
  }

  if (map) {
    map.classList.add('map__wrapper--js');

    const init = function () {
      const myMap = new window.ymaps.Map('map', {
        center: mapCoordCenter,
        zoom: mapZoom,
        controls: ['smallMapDefaultSet']
      });

      const myPlacemark = new window.ymaps.Placemark(mapCoord, {
        hintContent: 'Эй, мы здесь!',
        balloonContent: 'Образовательный центр Clever Baby'
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/dest/map-pin.svg',
        iconImageSize: [32, 39],
        iconImageOffset: mapIconImageOffset
      });

      myMap.geoObjects.add(myPlacemark);

    };

    window.ymaps.ready(init);

  }

  /*video*/
  const video = {};
  video.wrapper = document.querySelector('.methodology__video');
  video.poster = video.wrapper.querySelector('picture');
  video.video = document.querySelector('#video');
  video.button = document.querySelector('#video-button');

  function initVideo(el) {
    function startVideo() {
      el.wrapper.classList.add('process__video--start-js');
      if (el.poster.parentNode) {
        el.poster.parentNode.removeChild(el.poster);
      }
      el.video.play();
    }

    function pauseVideo() {
      el.wrapper.classList.remove('process__video--start-js');
    }

    el.video.addEventListener('pause', pauseVideo);

    el.video.addEventListener('play', startVideo);

    el.button.addEventListener('click', startVideo);
  }

  initVideo(video);
})()