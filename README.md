SuperSimpleSim
======

This framework provides the bare bones for running a natural simulation in a web browser and is based on [FloraJS](http://github.com/vinceallenvince/FloraJS) and [Burner](http://github.com/vinceallenvince/Burner). You can [view the examples](http://vinceallenvince.github.io/SuperSimpleSim/).

To create a system, reference SuperSimpleSim.min.js and SuperSimpleSim.min.css in the &lt;HEAD&gt; of your HTML document. Call System.setup and pass in a function to add an instance of Item. Call System loop to start the animation loop.

```html

<!DOCTYPE html>
<html>
<head>
  <meta http-equiv='content-type' content='text/html; charset=UTF-8' />
  <meta name='viewport' content='user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0' />
  <meta name='apple-mobile-web-app-capable' content='yes' />
  <title>SuperSimpleSim</title>
  <link href='css/SuperSimpleSim.min.css' rel='stylesheet' type='text/css' charset='utf-8' />
  <script src='scripts/SuperSimpleSim.js' type='text/javascript' charset='utf-8'></script>
  </head>
  <body>
    <script type='text/javascript' charset='utf-8'>

      var sssim = SuperSimpleSim;

      sssim.System.setup(function() {
        this.add('Item');
      });

      sssim.System.loop();

    </script>
  </body>
</html>

```

By default, a System defines gravity as a vector pointing straight down. You can add wind by setting it directly.

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv='content-type' content='text/html; charset=UTF-8' />
  <meta name='viewport' content='user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0' />
  <meta name='apple-mobile-web-app-capable' content='yes' />
  <title>SuperSimpleSim</title>
  <link href='css/SuperSimpleSim.min.css' rel='stylesheet' type='text/css' charset='utf-8' />
  <script src='scripts/SuperSimpleSim.min.js' type='text/javascript' charset='utf-8'></script>
  </head>
  <body>
    <script type='text/javascript' charset='utf-8'>

      var sssim = SuperSimpleSim;
      var width = document.body.scrollWidth;
      var height = document.body.scrollHeight;
      var rand = sssim.System.getRandomNumber;
      var minScale = 5;
      var maxScale = 50;
      var map = sssim.System.map;

      sssim.System.setup(function() {
        for (var i = 0; i < 180; i++) {
          scale = rand(minScale, maxScale);
          this.add('Item', {
            width: scale,
            height: scale,
            mass: Math.pow(scale, 2),
            color: [map(scale, minScale, maxScale, 0, 150), map(scale, minScale, maxScale, 0, 100), scale],
            location: new sssim.Vector(rand(0, width), rand(0, height))
          });
        }
        this.wind = new sssim.Vector(1, 0.2);
      });

      sssim.System.loop();

    </script>
  </body>
</html>
```

Please also [view the examples](http://vinceallenvince.github.io/SuperSimpleSim/), [check out the docs](http://vinceallenvince.github.io/SuperSimpleSim/doc), or see what plato [has to say about it](http://vinceallenvince.github.io/SuperSimpleSim/reports).


Building this project
------

This project uses [Grunt](http://gruntjs.com). To build the project first install the node modules.

```
npm install
```

Next, run grunt.

```
grunt
```

For tests, run grunt test.
```
grunt test
```

For test coverage, run grunt testcoverage.
```
grunt testcoverage
```

A pre-commit hook is defined in /pre-commit that runs jshint. To use the hook, run the following:

```
ln -s ../../pre-commit .git/hooks/pre-commit
```

A post-commit hook is defined in /post-commit that runs the Plato complexity analysis tools. To use the hook, run the following:

```
ln -s ../../post-commit .git/hooks/post-commit
```
