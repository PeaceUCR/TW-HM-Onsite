/**
 * Created by hea on 3/20/19.
 */
// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.

import 'angular';
import 'angular-mocks/angular-mocks';

const context = require.context('./test', true, /\.js$/);

context.keys().forEach(context);