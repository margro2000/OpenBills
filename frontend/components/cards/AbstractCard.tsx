import { Card, Text } from "@nextui-org/react";


export const AbstractCard = ({abstract} : {abstract: string}) => {
    return(
        <Card css={{ height: '100%' }}>
            <Card.Header>
                <Text b h5>Things of Note</Text>
            </Card.Header>
            <Card.Body>
                <Text>{abstract}</Text>
            </Card.Body>
            <Card.Divider/>
        </Card>
    );
}
