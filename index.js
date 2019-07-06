export default class CssAnimationTimeline
{
    _isPlaying = false;
    _keyframes = [];
    _animationEndingEvents = [
        'webkitTransitionEnd', 'otransitionend',
        'oTransitionEnd', 'msTransitionEnd',
        'transitionend'
    ];

    delay(time) {
        this._keyframes.push({
            type: 'delay',
            time
        });

        /** Allow method chaining */
        return this;
    }

    add(selector, classToAdd, staggerEach = 0) {
        document.querySelectorAll(selector).forEach((el) => {
            this._keyframes.push({
                type: 'animate',
                el,
                classToAdd,
                staggerEach
            });
        });

        /** Allow method chaining */
        return this;
    }

    tidyUp() {
        this._keyframes.forEach((keyframe, keyframeIndex) => {
            this._unwatchElement(keyframe.el, keyframeIndex);
        });

        /** Allow method chaining */
        return this;
    }

    play() {
        return this._play(this._keyframes);
    }

    replay() {
        return this._play();
    }

    reset() {
        return this.tidyUp();
    }

    /** Private */
    _play(keyframes) {
        this.tidyUp();
        return this._playKeyframes(keyframes);
    }

    /** Private */
    _playKeyframes(keyframes) {
        this._isPlaying = true;
        let frames = keyframes.map((keyframe, keyframeIndex) => () => this._playKeyframe(keyframeIndex));

        return frames.reduce((previousFrame, nextFrame) => previousFrame.then(nextFrame), Promise.resolve())
            .then(() => this._isPlaying = false);
    }

    /** Private */
    _playKeyframe(keyframeIndex) {
        // console.log('Playing keyframe ' + keyframeIndex);
        let keyframe = this._getKeyframe(keyframeIndex);

        return new Promise((resolve, reject) => {
            if (this._isPlaying === false) {
                reject();
                return;
            }

            switch (keyframe.type) {
                case 'delay' :
                    setTimeout(resolve, keyframe.time);
                    break;
                default:
                    this._unwatchElement(keyframe.el, keyframeIndex);
                    this._watchElement(keyframe.el, keyframeIndex, resolve);
                    break;
            }

        });
    }

    /** Private */
    _getKeyframe(index) {
        return this._keyframes[index];
    }

    /** Private */
    _unwatchElement(el, keyframeIndex) {
        let keyframe = this._getKeyframe(keyframeIndex);

        if (keyframe.type !== 'animate') {
            return;
        }

        el.classList.remove(keyframe.classToAdd);

        if (keyframe.staggerEach != 0) {
            this._animationEndingEvents.forEach(eventName => el.removeEventListener(eventName, keyframe.finishCallback));
        }
    }

    /** Private */
    _watchElement(el, keyframeIndex, eventFunctionTrigger) {
        let keyframe = this._getKeyframe(keyframeIndex);

        keyframe.finishCallback = eventFunctionTrigger;
        el.classList.add(keyframe.classToAdd);

        if (keyframe.staggerEach === 0) {
            this._animationEndingEvents.forEach(eventName => el.addEventListener(eventName, eventFunctionTrigger));
        } else {
            setTimeout(eventFunctionTrigger, keyframe.staggerEach);
        }
    }
}