import { Card, Text } from "@nextui-org/react";


export const OutlineCard = () => {
    return(
        <Card css={{ height: '100%' }}>
            <Card.Header>
                <Text b h5>Summary</Text>
            </Card.Header>
            <Card.Divider/>
            <Card.Body>

            </Card.Body>
        </Card>
    );
}
