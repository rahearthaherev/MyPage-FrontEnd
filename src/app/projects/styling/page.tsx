"use client";

import { Box, Grid } from "@mui/material";
import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

const type = ["トップス", "ボトムス", "靴", "アクセサリー"];

const data: RenderTree = {
  id: "root",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
        },
      ],
    },
  ],
};

export default function projectPage() {
  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  return (
    <Grid container>
      <Grid lg={4} item>
        <Box
          border={1}
          borderColor="lightgray"
          borderRadius={2}
          height="100%"
          width="100%"
          sx={{ backgroundColor: "", margin: "15px", padding: "15px" }}
        >
          {" "}
          <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root"]}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {type.map((type, index) => {
              const node: RenderTree = {
                id: index.toString(),
                name: type,
                children: [
                  {
                    id: "tt",
                    name: "test",
                  },
                ],
              };
              return renderTree(node);
            })}
          </TreeView>
        </Box>
      </Grid>
      <Grid lg={4} item></Grid>
      <Grid lg={4} item></Grid>
    </Grid>
  );
}
