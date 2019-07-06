# CSS Animation Timeline

Easily control complex css animations using this tiny utility class (under 4kb!)

## Features
 - Easy, fluent syntax
 - Method chaining supported
 - Optional staggering if multiple elements with the css selector are found
 - Add arbitrary delaying at any point

```javascript
import CssAnimationTimeline from 'css-animation-timeline';

let tl = new CssAnimationTimeline();

tl.add('.heading', 'fade-in')
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
     this.pageEnterTl = new CssAnimationTimeline()
                           .add('.heading', 'fade-in')
                           .delay(500)
                           .add('.text-block', 'fade-in', 100)
                           .play();
   },
   destroyed() {
     this.pageEnterTl.tidyUp();
   }
}
```
