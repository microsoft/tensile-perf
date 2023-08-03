import * as React from 'react';
import type { TreeItemRenderer } from '@stress-test/react';
import type { RandomTreeNode } from '@stress-test/tree'
import { TreeNode } from '@stress-test/react';
import { SingleFolderComponent } from './SingleFolder';

import './MailUI.css';

const WrappedButton: TreeItemRenderer<unknown> = (props) => {
  const { depth, index, className} = props;
  return <button className={`wrapped-button tree-node ${className} depth-${depth} index-${index}`}/>;
}

const Buttons: TreeItemRenderer<RandomTreeNode<unknown>> = (props) => {
  const { root, depth, index, className } = props;
  const children = root.children.map((child : any, i : number) => {
    return <TreeNode key={i} root={child as RandomTreeNode<unknown>} itemRenderer={WrappedButton} depth={depth+1} index={index+1} />
  });
  return (
    <div className={`buttons tree-node ${className} depth-${depth + 1} index-${index+1}`}>
      {children}
    </div>
  );
}

const TopBar: TreeItemRenderer<RandomTreeNode<unknown>> = (props) => {
  const { root, depth, index, className } = props;
  const children = [
    <p key={0}> YourMail </p>,
    <textarea key = {1}/>,
    <TreeNode key = {2} root={root.children[0] as RandomTreeNode<unknown>} itemRenderer={Buttons} depth={depth+1} index={index+1} />
  ];
  return (
    <div className={`top-bar tree-node ${className} depth-${depth + 1} index-${index + 1}`}>
      {children}
    </div>
  );
}

const MainArea: TreeItemRenderer<RandomTreeNode<unknown>> = (props) => {
  const { root, depth, index, className } = props;
  const children = [
    <div key = {0} className="ribbon">
      <TreeNode root={root.children[0] as RandomTreeNode<unknown>} itemRenderer={Buttons} depth={depth+1} index={index+1} />
    </div>,
    <div key= {1} className="folder-holder">
      <TreeNode root={(root.children[1] ?? root.children[0]) as RandomTreeNode<unknown>} itemRenderer={SingleFolderComponent} depth={depth+1} index={index+1} />
    </div>,
    <div key = {2} className="inner-main" />
  ];
  return (<div className={`mail-main-area tree-node ${className} depth-${depth + 1} index-${index + 1}`}>
            {children}
          </div>
         );

}

export const MailUI: TreeItemRenderer<RandomTreeNode<unknown>>= (props) => {
  const { root, depth, index, className } = props;

  const children = [
    <TreeNode key={0} root={root.children[0] as RandomTreeNode<unknown>} itemRenderer={TopBar} depth={depth+1} index={index+1} />,
    <div className="show-more" key={2}>
      <TreeNode root={(root.children[1] ?? root.children[0]) as RandomTreeNode<unknown>} itemRenderer={WrappedButton} depth={depth+1} index={index+1} />
    </div>,
    <div className="side-bar" key={3}>
      <TreeNode root={(root.children[2] ?? root.children[0]) as RandomTreeNode<unknown>} itemRenderer={Buttons} depth={depth+1} index={index+1} />
    </div>,
    <TreeNode key={4} root={(root.children[3] ?? root.children[0]) as RandomTreeNode<unknown>} itemRenderer={MainArea} depth={depth+1} index={index+1} />,
  ];

  return (
    <div className={`mail-ui tree-node ${className} depth-${depth} index-${index}`}>
      {children}
    </div>
  );
}

