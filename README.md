ImageLoaderJS
=============

A simple script that loads images and invokes a callback when finished loading.

###Usage
Specify an array of resources: key and url to the image
```javascript
var images = [
  { key: "kitten01", url: "http://placekitten.com/g/200/300" },
  { key: "kitten02", url: "http://placekitten.com/g/400/200" }
];
```

Get a new ImageLoader instance, register a callback and start the queue:
```javascript
var loader = ImageLoader.getInstance();
loader.onReady(function() {
  // loading finished, do something useful here
});
loader.load(images);
```

Once loading has finished you can use get() function to access your images:
```javascript
var image = loader.get("kitten01");
if (image) {
  // image loaded successfully, do something useful here
} else {
  // error loading image
}
```
