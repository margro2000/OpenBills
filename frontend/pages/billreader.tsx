import { NextPage } from "next";
import { Layout } from "../components/navbar/layout";
import { Button, Card, Grid, Input } from "@nextui-org/react";

const BillReader: NextPage = () => {
  return (
    <Grid.Container gap={2} justify="center">
        <Grid xs={6} sm={6}>
            <Input placeholder="Ask a Question"></Input>
            <Button>Submit</Button>
        </Grid>
        <Grid xs={12} sm={6}>
            <Card>
                <Card.Header>Summary/Abstract</Card.Header>
            </Card>
        </Grid>
        <Grid xs={12} sm={6}>
            <Card>
                <Card.Header>Recommended Questions</Card.Header>
            </Card>
        </Grid>
        <Grid xs={12} sm={6}>
            <Card>
                <Card.Header>Table of Contents/Outline</Card.Header>
            </Card>
        </Grid>
    </Grid.Container>
  );
};

export default BillReader;
