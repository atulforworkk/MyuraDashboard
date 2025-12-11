import React from "react";
import { Grid } from '@mantine/core';
type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div>
      <Grid>
        <Grid.Col span={4}>
          Session 
        </Grid.Col>
        <Grid.Col span={4}>
          Total Sales Breakdown 
        </Grid.Col>
        <Grid.Col span={4}>Orders </Grid.Col>
      </Grid>
    </div>
  );
};

export default Dashboard;
