/**
 * The MIT License (MIT)
 * Copyright (c) 2014 Andreas Tscheinig
 * See LICENSE file in ImageLoaderJS repository for the full text of license.
 */
ImageLoader = (function() {
	var loader;

	var ImageLoader = (function() {
		/* private members */

		/**
		 * The resources
		 * @type {Array.<object>}
		 * @private
		 */
		var resources = [],
		/**
		 * The registered callbacks
		 * @type {Array.<function>}
		 * @private
		 */
			callbacks = [];

		/**
		 * An image loader
 		 * @constructor
 		 * @private
 		 */
		var imageLoader = function() {};

		/* private methods */

		/**
		 * Checks if all resources have been loaded
		 * @return {boolean} True if all resources have been loaded
		 * @private
		 */
		function isReady() {
			var i, res, ready = true;
			for (i = 0; i < resources.length; i++) {
				res = resources[i];
				if (!res.ready) {
					ready = false;
				}
			}
			return ready;
		}

		/**
		 * Loads the given element. If the image could not be loaded porperly, the image attribute will be set to null.
		 * @param {key: string, url: string} item A resource that contains a key and an url to the image to load
		 * @private
		 */
		function load(item) {
			var img, res;
			if (get(item.key)) {
				return;
			}
			img = document.createElement("img");
			item.ready = false;
			resources.push({ key: item.key, ready: false});
			img.onload = function() {
				processResource(item.key, img, false);
			};
			img.onerror = function() {
				processResource(item.key, img, true);
			}
			img.src= item.url;
		}

		/**
		 * Processes the loaded image. If error flag is set to ture, an error occured while loading the image.
		 * All registered callbacks will be invoked
		 * @param {string} key The resource-key
		 * @param {object} img An image
		 * @param {boolean=} error True if an error occured when loading the image (optional)
		 * @private
		 */
		function processResource(key, img, error) {
			res = get(key);
			if (res) {
				res.ready = true;
				res.image = error ? null : img;
			}

			if (isReady()) {
				for (var i = 0; i < callbacks.length; i++) {
					callbacks[i]();
				}
			}
		}

		/**
		 * Get the resource with the given key
		 * @param {string} key The resource-key
		 * @return {object} The resource with the given key or null
		 * @private
		 */
		function get(key) {
			var retVal = null, res;
			for (var i = 0; i < resources.length; i++) {
				res = resources[i];
				if (res.key === key) {
					retVal = res;
					break;
				}
			}
			return retVal;
		}

		/* public methods */

		/**
		 * Load the given items.
		 * @param {Array.<object>|object} items A single image or an array of images to load. A resource must have a key and an url property {key: string, url: string}
		 */
		imageLoader.prototype.startQueue = function(items) {
			if (items instanceof Array) {
				for (var i = 0; i < items.length; i++) {
					load(items[i]);
				}
			} else {
				load(items);
			}
		};

		/**
		 * Register a callback that will be invoked when all resources have been loaded.
		 * @param {function} callback A callback to be registered
		 */
		imageLoader.prototype.onReady = function(callback) {
			callbacks.push(callback);
		};

		/**
		 * Get the resources with the given key
		 * @param {string} key The resource-key
		 * @return {object} The resource with the given key or null
		 */
		imageLoader.prototype.get = function(key) {
			return get(key);
		};

		return imageLoader;
	})();

	return {
		/**
		 * Get the existing image loader or create a new one
		 * @return {ImageLoader} An image loader
		 */
		getInstance: function() {
			if (!loader) {
				loader = new ImageLoader();
			};
			return loader;
		}
	}
})();
