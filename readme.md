# CSS Animation Timeline

Easily control complex css animations using this tiny utility class (3kb!)

<img src="https://thumbs.gfycat.com/PleasedFarBlackandtancoonhound.webp" />

View example on [Codepen](https://codepen.io/JWardee/pen/agaXrW/)

## Features
 - Easy, fluent syntax
 - Method chaining supported
 - Optional staggering if multiple elements with the css selector are found
 - Add arbitrary delaying at any point
 - Any [valid css selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll#Parameters) can be used to specify elements

## Getting started
Install the library from npm

```bash
npm i css-animation-timeline
```

Then import it into your project

```javascript
import CssAnimationTimeline from 'css-animation-timeline';
```
Once you've done that you just need to new up an instance, add your elements and hit play!

```javascript
let tl = new CssAnimationTimeline()
        .add('.heading', 'fade-in')
        .delay(500)
        .add('.text-block', 'fade-in', 100)
        .play()
        .then(() => {
          console.log('Animation finished!');
        });
```

Make sure you call `tidyUp()` when you want to reset everything - this will remove the classes and event hooks. If you don't you'll develop a memory leak

## Vue example

```javascript
export default {
  mounted() {
    this.pageEnterTl = new CssAnimationTimeline();

    /** Inside Vue $refs also work as well as query selectors */
    this.pageEnterTl.add(this.$refs['heading'], 'fade-in')
                    .delay(500)
                    .add('.text-block', 'fade-in', 100)
                    .play();
  },
  destroyed() {
    this.pageEnterTl.tidyUp();
  }
}
```

## Extra resources
- View example on [Codepen](https://codepen.io/JWardee/pen/agaXrW/)
- View [NPM page](https://www.npmjs.com/package/css-animation-timeline)
