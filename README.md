ImageLoader.js
=============

A simple script to load images and invoke callbacks after loading has finished.

NOt working
[>> JSFiddle Demo](http://jsfiddle.net/jzsw43j5/)

**JSFiddle Demos currently only working on firefox**

###Usage
Specify an array of resources: key and image-url
```javascript
var images = [
  { key: "kitten01", url: "http://placekitten.com/g/200/300" },
  { key: "kitten02", url: "http://placekitten.com/g/400/200" }
];
```

Create a new ImageLoader instance, register a callback and start the queue:
```javascript
var loader = new ImageLoader();
loader.onReady(function() {
  // loading finished, do something useful here
});
loader.startQueue(images);
```
Note: You can also register multiple callbacks!

Use get() to access your images. The object you get looks like this:
```javascript
{
  key: string,
  ready: boolean,
  image: Image
}
```
The ready-property is set to true if the image has been processed.

The image-property is set to null if an error occured during loading an image (i.e. the image was not found).
```javascript
var resource = loader.get("kitten01");
if (resource.ready && resource.image) {
  // image loaded successfully, do something useful here
} else {
  // error loading image
}
```
Note: If you call get() after loading (i.e. in your callback) you don't need to check the ready flag)!
