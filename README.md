SuperSimpleSim
======

This framework provides the bare bones for running a natural simulation in a web browser and is based on [FloraJS](http://github.com/vinceallenvince/FloraJS) and [Burner](http://github.com/vinceallenvince/Burner).

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

A pre-commit hook is defined in /pre-commit that runs jshint. To use the hook, run the following:

```
ln -s ../../pre-commit .git/hooks/pre-commit
```

A post-commit hook is defined in /post-commit that runs the Plato complexity analysis tools. To use the hook, run the following:

```
ln -s ../../post-commit .git/hooks/post-commit
```
