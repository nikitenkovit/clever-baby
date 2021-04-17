import {DIRECTION} from "./const";
import {touchStart} from "./touch";

export default class Slider {
  constructor(root) {
    this._slider = root;
    this._wrapper = this._slider.querySelector(`.slider__wrapper`);
    this._sliderList = this._slider.querySelector(`.slider__list`);
    this._sliderItem = this._slider.querySelector(`.slider__item`);
    this._sliderNextButton = this._slider.querySelector(`.slider__button--right`);
    this._sliderPrevButton = this._slider.querySelector(`.slider__button--left`);

    this._isNeedMove = true;
    this._sliderDirection = DIRECTION.RIGHT;
    this._marginRight = parseInt(window.getComputedStyle(this._sliderItem, null)
        .getPropertyValue('margin-right'), 10);

    this._sliderStep = this._sliderItem.offsetWidth + this._marginRight;

    this._currentTranslate = 0;

    this._sumOfAllElements = this._sliderList.children.length;
    this._currentStep = 0;

    this._setNextButtonClickHandler = this._setNextButtonClickHandler.bind(this);
    this._setPrevButtonClickHandler = this._setPrevButtonClickHandler.bind(this);

    this._moveNext = this._moveNext.bind(this);
    this._movePrev = this._movePrev.bind(this);
    this._checkIsNeedButtonDisable = this._checkIsNeedButtonDisable.bind(this);
  }

  init() {
    this._set_initialPosition();

    this._sliderStep = this._sliderItem.offsetWidth + this._marginRight;

    this._setNextButtonClickHandler();
    this._setPrevButtonClickHandler();

    this._setTransitionStartHandler();
    this._setTransitionEndHandler();

    this._setTouchStartHandler();

    this._checkIsNeedButtonDisable();
  }

  _checkIsNeedButtonDisable() {
    const numberOfVisibleElements = Math.round(this._sliderList.offsetWidth / this._sliderStep);

    this._sliderPrevButton.disabled = this._currentStep <= 0;
    this._sliderNextButton.disabled = this._currentStep + numberOfVisibleElements >= this._sumOfAllElements;
  }

  _set_initialPosition() {
    this._sliderList.style.transform = this._getTranslate();
  }

  _getTranslate(tx = 0, ty = 0, tz = 0) {
    return `translate3d(${tx}px, ${ty}px, ${tz}px)`;
  }

  _setCurrentTranslate(direction) {
    this._currentTranslate += direction * this._sliderStep;
  }

  _setTransform() {
    this._sliderList.style.transform = this._getTranslate(this._currentTranslate);
  }

  _increaseStep() {
    this._currentStep++;
  }

  _decreaseStep() {
    this._currentStep--;
  }

  _moveNext() {
    if (this._isNeedMove) {
      if (this._sliderDirection === DIRECTION.LEFT) {
        this._sliderDirection = DIRECTION.RIGHT;
      }

      this._increaseStep()

      this._setCurrentTranslate(this._sliderDirection);

      this._setTransform();
    }
  }

  _movePrev() {
    if (this._isNeedMove) {
      if (this._sliderDirection === DIRECTION.RIGHT) {
        this._sliderDirection = DIRECTION.LEFT;
      }

      this._decreaseStep();

      this._setCurrentTranslate(this._sliderDirection);

      this._setTransform();
    }
  }

  _setNextButtonClickHandler() {
    this._sliderNextButton.addEventListener(`click`, this._moveNext);
  }

  _setPrevButtonClickHandler() {
    this._sliderPrevButton.addEventListener(`click`, this._movePrev);
  }

  _setTransitionStartHandler() {
    this._sliderList.addEventListener(`transitionstart`, () => {
      this._isNeedMove = false;
    });
  }

  _setTransitionEndHandler() {
    this._sliderList.addEventListener(`transitionend`, () => {
      this._checkIsNeedButtonDisable()
      this._isNeedMove = true;
    });
  }

  _setTouchStartHandler() {
    this._wrapper.addEventListener(`touchstart`, (evt) => {
      touchStart(evt, this._sliderList, this._moveNext, this._movePrev);
    });
  }
}
