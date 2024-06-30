import { NextPage } from "next";
import { Layout } from "../components/navbar/layout";
import { Button, Card, Grid, Input } from "@nextui-org/react";
import { AbstractCard } from "../components/cards/AbstractCard";
import { OutlineCard } from "../components/cards/OutlineCard";
import { useEffect, useState } from "react";

export const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:8000/summarize_bill/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

const BillReader: NextPage = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
          try {
            const result = await fetchData();
            setData(result);
          } catch (error) {
            setError('Failed to fetch data');
          }
        };
    
        loadData();
      }, []);
    console.log("data", data)
  return (
    <Layout>
      <Grid.Container gap={2} css={{ height: '100vh', padding: '1rem' }}>
      <Card css={{ width: '100%' }}>
            <Card.Body>
                <input type="file" id="fileUpload" hidden />
                <label htmlFor="fileUpload">
                    <Button as="span">
                        Upload File
                    </Button>
                </label>
            </Card.Body>
        </Card>
         <Grid xs={12} sm={6} css={{ display: 'flex', flexDirection: 'column',height:'100%', gap: '10px' }}>
            <Card style={{height:'100%'}}>
                <Grid.Container gap={1} alignItems="center" style={{padding: '1rem'}}>
                    <Grid xs={8}>
                    <Input
                        placeholder="Ask a Question"
                        css={{ width: '100%' }}
                    />
                    </Grid>
                    <Grid xs={4}>
                    <Button auto color="gradient" ghost>Submit</Button>
                    </Grid>
                </Grid.Container>
           </Card>
         </Grid>
        
        <Grid xs={12} sm={6} css={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
            <Grid css={{ flex: '1' }}>
                <AbstractCard abstract={"these are the things to note"}/>
            </Grid>
            <Grid css={{ flex: '1' }}>
                <OutlineCard/>
            </Grid>
        </Grid>
        
      </Grid.Container>
    </Layout>
  );
};

export default BillReader;
