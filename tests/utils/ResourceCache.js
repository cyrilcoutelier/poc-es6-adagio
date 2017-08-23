// jshint module:true

const ResourceCache = function (loadResources) {
  this.init(loadResources);
};

const _resourceCache = ResourceCache.prototype;

_resourceCache.init = function (loadResources) {
  this.loadResourcesFunc = loadResources;
  this.resources = {};
};

_resourceCache.getResources = function (resourcesNames, callback) {
  const resources = {};
  const resourcesToLoad = this.filterLoadedResources(resourcesNames);
  this.loadResources(resourcesToLoad, function (error) {
    this.fillLoadedResources(resourcesNames, resources);
    callback(error, resources);
  }, this);
};

_resourceCache.filterLoadedResources = function (resourcesNames) {
  const filteredResourcesNames = resourcesNames.filter(function (resourceName) {
    return !this.resources[resourceName];
  }, this);
  return filteredResourcesNames;
};

_resourceCache.fillLoadedResources = function (resourcesNames, destResrouces) {
  resourcesNames.forEach(function (resourceName) {
    if (this.resources[resourceName]) {
      destResrouces[resourceName] = this.resources[resourceName];
    }
  }, this);
};

_resourceCache.loadResources = function (resourcesNames, callback, ctx) {
  this.loadResourcesFunc(resourcesNames, function (error, resources) {
    for (const scoreName in resources) {
      this.resources[scoreName] = resources[scoreName];
    }
    callback.call(ctx, error);
  }.bind(this));
};

export default ResourceCache;
