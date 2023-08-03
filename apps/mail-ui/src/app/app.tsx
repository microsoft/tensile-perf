import * as React from 'react';

import { Tree } from '@stress-test/react';
import { injectStyles } from '@stress-test/tools';

import { MailUI } from './components/MailUI';
import { SingleFolderComponent } from './components/SingleFolder';

const params = new URLSearchParams(window.location.search);
const { fixture } = await import(`../fixtures/${params.get('fixture')}.js`);

injectStyles({ selectors: fixture.selectors });

export function App() {

  const renderers = React.useMemo(() => {
    const rendererMap = new Map<string, unknown>();
    rendererMap.set('FolderComponent', SingleFolderComponent);
    rendererMap.set('MailUI', MailUI);
    
    return rendererMap;
  }, []);

  return (
    <Tree tree={fixture.tree} itemRenderer={null} renderers={renderers}/>
  );
}

export default App;
