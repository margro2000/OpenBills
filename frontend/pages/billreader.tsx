import { NextPage } from "next";
import { Layout } from "../components/navbar/layout";
import { Button, Card, Grid, Input } from "@nextui-org/react";

const BillReader: NextPage = () => {
  return (
    <Layout>
      <Grid.Container gap={2} css={{ height: '100vh', padding: '1rem' }}>
        <Grid xs={12} sm={6} css={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Grid.Container gap={1} alignItems="center">
            <Grid xs={8}>
              <Input
                placeholder="Ask a Question"
                css={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={4}>
              <Button auto>Submit</Button>
            </Grid>
          </Grid.Container>
        </Grid>

        <Grid xs={12} sm={6} css={{ height: '50%' }}>
          <Card css={{ height: '100%' }}>
            <Card.Header>Summary/Abstract</Card.Header>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} css={{ height: '50%' }}>
          <Card css={{ height: '100%' }}>
            <Card.Header>Recommended Questions/Answers</Card.Header>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} css={{ height: '50%' }}>
          <Card css={{ height: '100%' }}>
            <Card.Header>Table of Contents/Outline</Card.Header>
          </Card>
        </Grid>
        
      </Grid.Container>
    </Layout>
  );
};

export default BillReader;
