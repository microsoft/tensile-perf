import * as React from 'react';
import { TreeNode } from '@tensile-perf/react';
import type { TreeItemRenderer } from '@tensile-perf/react';
import type { RandomTreeNode } from '@tensile-perf/tree'

// Folder Item component. There will be more parent components to this.
export const SingleFolderComponent: TreeItemRenderer<RandomTreeNode<unknown>> = (props) => {
  const { root, depth, index, className } = props;
  const children = root.children.map((child : any, i : number) => {
    return <TreeNode key={i} root={child as RandomTreeNode<unknown>} itemRenderer={SingleFolderComponent} depth={depth+1} index={index+1} />
  });

  const showMore = children.length > 0 ? <button key = {0}> + </button> : <span key = {0}/>;
  return (
    <div className={`folder tree-node ${className} depth-${depth} index-${index}`}>
      <div className = "row_wrapper">
        <span className="show_more">{showMore}</span>
        <span>{index}</span>
        <span>
          <span>{depth}</span>
        </span>
      </div>
      {children}
    </div>
  );
}
