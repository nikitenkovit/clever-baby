export const touchStart = (startEvent, wrapper, callbackNext, callbackPrev) => {
  let startX = startEvent.changedTouches[0].clientX;

  const touchEnd = (endEvent) => {
    let shiftX = startX - endEvent.changedTouches[0].clientX;

    if (shiftX > 0 && shiftX > 30) {
      callbackNext();
    } else if (shiftX < 0 && shiftX < -30) {
      callbackPrev();
    }

    wrapper.removeEventListener(`touchend`, touchEnd);
  };

  wrapper.addEventListener(`touchend`, touchEnd);
};
