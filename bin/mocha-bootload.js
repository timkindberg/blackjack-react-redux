require('babel-polyfill');

const { presets, plugins } = require('react-scripts/config/babel.dev');
require('babel-core/register')({ presets, plugins });

const ignore = require('ignore-styles');

ignore.default(['.css', '.scss', '.sass', '.stylus', '.styl', '.less', '.gif', '.png', '.jpg']);

const chai = require('chai');

chai.use(require('chai-enzyme')());
chai.use(require('sinon-chai'));
chai.should();
