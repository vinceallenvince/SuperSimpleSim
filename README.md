SuperSimpleSim
======

This framework provides the bare bones for running a natural simulation in a web browser and is based on [FloraJS](http://github.com/vinceallenvince/FloraJS) and [Burner](http://github.com/vinceallenvince/Burner).


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
