// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type{ RandomTreeBuilderParams, RandomTreeNode, RandomTreeNodeCreateCallback } from '../types';
import { getRandomUtil } from '@tensile-perf/tools';
import type { RandomUtil } from '@tensile-perf/tools';


export class RandomTreeBuilder<T> {
  private numNodes: number;
  private minDepth: number;
  private maxDepth: number;
  private minBreadth: number;
  private maxBreadth: number;
  private targetSize: number;

  private rando: RandomUtil;

  constructor({
    minDepth = 1,
    maxDepth = 15,
    minBreadth = 1,
    maxBreadth = 15,
    seed,
    targetSize,
  }: RandomTreeBuilderParams = {}) {
    this.minDepth = Number(minDepth);
    this.maxDepth = Number(maxDepth);
    this.minBreadth = Number(minBreadth);
    this.maxBreadth = Number(maxBreadth);
    this.targetSize = targetSize ? Number(targetSize) : Infinity;

    this.rando = getRandomUtil(seed);
    this.numNodes = 0;
  }

  /**
   * Builds a new tree based on the parameters passed to the constructor.
   * @param createNode Callback function used to create tree nodes.
   * @returns The root node of the tree.
   */
  public build = (createNode: RandomTreeNodeCreateCallback<T>): RandomTreeNode<T> => {
    this.numNodes = 1;
    const root = createNode(null, 0, 0);
    let tree = this._doBuild(createNode, root, 1);
    while (this.numNodes < this.targetSize) {
      tree = this._doBuild(createNode, root, 1);
    }

    return tree;
  };

  /**
   * Builds a tree from a fixture (e.g., from a tree saved as a JSON file)
   * @param fixture Fixture node to start building from (i.e., the tree root)
   * @param parent Parent node of the fixture node. Typically you wouldn't pass anything here.
   * @returns The root node of the tree.
   */
  public fromFixture = (fixture: RandomTreeNode<T>, parent: RandomTreeNode<T> | null = null): RandomTreeNode<T> => {
    const root: RandomTreeNode<T> = {
      value: fixture.value,
      children: [],
      parent,
    };

    for (const child of fixture.children) {
      root.children.push(this.fromFixture(child, root));
    }

    return root;
  };

  private _randomDepth = (max?: number): number => {
    return this.rando.range(this.minDepth, max ?? this.maxDepth);
  };

  private _randomBreadth = (max?: number): number => {
    return this.rando.range(this.minBreadth, max ?? this.maxBreadth);
  };

  private _doBuild = (
    createNode: RandomTreeNodeCreateCallback<T>,
    parent: RandomTreeNode<T>,
    currentDepth: number,
    currentBreadth: number = this.maxBreadth,
  ): RandomTreeNode<T> => {
    const breadth = this._randomBreadth(currentBreadth);
    const depth = this._randomDepth(Math.max(this.maxDepth - currentDepth, this.minDepth));

    for (let i = 0; i < breadth && this.numNodes < this.targetSize; i++) {
      this.numNodes++;
      const node = createNode(parent, currentDepth, breadth);

      parent.children.push(node);

      if (currentDepth < depth && this.numNodes < this.targetSize) {
        this._doBuild(createNode, node, currentDepth + 1);
      }
    }

    return parent;
  };
}
