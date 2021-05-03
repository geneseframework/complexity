

declare const require: {
    context(path: string, deep?: boolean, filter?: RegExp): {
        keys(): string[];
        <T>(id: string): T;
    };
};

// First, initialize the Angular testing environment.
// getTestBed().initTestEnvironment(
//     BrowserDynamicTestingModule,
//     platformBrowserDynamicTesting()
// );
// // Then we find all the tests.
// const context = require.context('./', true, /\.spec\.ts$/);
// // And load the modules.
// const value = context.keys().map(context);
