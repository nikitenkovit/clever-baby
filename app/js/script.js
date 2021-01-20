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











})()

