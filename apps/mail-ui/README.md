# Mail UI

Test Mail application.

## Usage

### Fixtures

First generate a test fixture and add it to `src/fixtures/{{fixtureName}}.js`. `{{fixtureName}}` can be anything you want.

For now, to generate a fixture you'll need to boot up the test runner. Once the fixture is generated and save you won't need to do this
again unless you want to make a new fixture.

### Start the dev server

`nx run mail-ui:serve`

### Load the app in a browser

When you run the app the console will provide you the port your app is running on. For this example, assume your port is `3000`.

In your browser open `http://localhost:3000?fixture={{fixtureName}}`. Where `{{fixtureName}}` is the name of the fixture you generated before.

## Features

The application will automatically pick up changes as you save files. Sometimes a page refresh may be required but you should not have to restart
the application server to observe changes.

### CSS

Import CSS directly to have it injected into the page. See `MailUI.tsx` for an example of this.