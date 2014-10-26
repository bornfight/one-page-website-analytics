# One page website analytics jQuery plugin

##Dependencies

  * [jQuery](https://github.com/jquery/jquery)
  * [Waypoint](https://github.com/imakewebthings/jquery-waypoints)
  * [Google Tag Manager](http://www.google.com/tagmanager/)


##Usage example
```html
<div id="home" class="page"><!-- home "page" content --></div>
<div id="about" class="page"><!-- about "page" content --></div>
<div id="contact" class="page"><!-- contact "page" content --></div>
```
```javascript
$('#home').waypointVirtualPage({url: '/home', pageTitle:'Home page'});
$('#about').waypointVirtualPage({url: '/about', pageTitle:'About', triggerDelay: 2500, downPercentage:0.6, upPercentage:0.4, down:false});
$('#contact').waypointVirtualPage({url: '/contact', pageTitle:'Contact', triggerDelay: 1500});
```

[Live demo](http://jsbin.com/xuyekuriheti/1/edit?html,js,console,output)


##Plugin options

* **url**, **pageTitle** - [string] - parameters to be passed to Google Tag manager
* **triggerDelay** - [integer, ms] - delay time to call a virtual "page" (to make sure it is not called when user is just fast scrolling through the "page")
* **downPercentage**, **upPercentage** - [decimal, 0-1] - percentage the "page" takes from the viewport height when it triggers the event 
(for example, downPercentage:0.6 - when scrolling down, trigger an event when the "page" height takes 60% of the viewport height)
* **up, down** - [boolean] - trigger directions (true by default)
