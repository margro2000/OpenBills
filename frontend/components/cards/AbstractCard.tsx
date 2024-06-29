import { Card, Text } from "@nextui-org/react";


export const AbstractCard = () => {
    return(
        <Card css={{ height: '100%' }}>
            <Card.Header>
                <Text b h5>Things of Note</Text>
            </Card.Header>
            <Card.Divider/>
        </Card>
    );
}
