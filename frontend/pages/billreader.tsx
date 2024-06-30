import { NextPage } from "next";
import { Layout } from "../components/navbar/layout";
import { Button, Card, Grid, Input } from "@nextui-org/react";
import { AbstractCard } from "../components/cards/AbstractCard";
import { OutlineCard } from "../components/cards/OutlineCard";

const BillReader: NextPage = () => {
  return (
    <Layout>
      <Grid.Container gap={2} css={{ height: '100vh', padding: '1rem' }}>
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
            <AbstractCard/>
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
