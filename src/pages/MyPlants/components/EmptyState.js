import React from "react";
import EmptyStateGraphic from "./EmptyStateGraphic";
import { Button } from "../../../components/Button";

export const EmptyState = (props) => {

  return (
    <div className="my-auto sm:my-auto flex flex-col gap-y-2 items-center px-5 sm:place-items-center">
      <EmptyStateGraphic className="max-w-48"/>
      <h1 className="text-xl font-bold">
        You don't have any plants yet!
      </h1>
      <Button variant="square" onClick={props.onClick}>Add Your First Plant</Button>
    </div>
  )
}