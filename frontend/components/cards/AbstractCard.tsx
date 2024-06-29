import { Card, Text } from "@nextui-org/react";


export const AbstractCard = () => {
    return(
        <Card css={{ height: '100%' }}>
            <Card.Header>
                <Text b h4>Abstract</Text>
            </Card.Header>
            <Card.Divider/>
        </Card>
    );
}
