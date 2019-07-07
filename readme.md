# CSS Animation Timeline

Easily control complex css animations using this tiny utility class (4kb!)

<img src="https://thumbs.gfycat.com/PleasedFarBlackandtancoonhound.webp" />

<p class="codepen" data-height="218" data-theme-id="dark" data-default-tab="js,result" data-user="JWardee" data-slug-hash="agaXrW" style="height: 218px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS Animation Timeline Demo">
  <span>See the Pen <a href="https://codepen.io/JWardee/pen/agaXrW/">
  CSS Animation Timeline Demo</a> by James (<a href="https://codepen.io/JWardee">@JWardee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Features
 - Easy, fluent syntax
 - Method chaining supported
 - Optional staggering if multiple elements with the css selector are found
 - Add arbitrary delaying at any point
 - Any [valid css selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll#Parameters) can be used to specify elements

## Getting started
You can either import the library or get a production copy of the code from the `dist/index.js` file in this repo
```javascript
import CssAnimationTimeline from 'css-animation-timeline';
```
Once you've done that you just need to new up an instance, add your elements and hit play!

```javascript
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

## Contributing
1. Pull the repo and run `npm install`
2. Ensure your code passes linting by running `npm run lint`
3. Submit your pull request!
