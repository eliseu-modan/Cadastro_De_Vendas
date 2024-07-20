/**
 *
 * List Tasks
 *
 */

import { Card } from "antd";

import withContext from "../../../contexts/withContexts";
import { useState } from "react";
import { PageEventsProvider } from "../../../contexts";
import {TasksList } from "../../../components/Dashboard";
import { useNavigate } from "react-router-dom";

function ListTask({ route, ...props }) {
  return (
    <Card style={{height:"100%"}}>
      <TasksList />
    </Card>
  );
}

export default withContext(PageEventsProvider)(ListTask);
