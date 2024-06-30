import { Card, Text } from "@nextui-org/react";


export const OutlineCard = ({outlineText} : {outlineText: string}) => {
    return(
        <Card css={{ height: '100%' }}>
            <Card.Header>
                <Text b h5>Summary</Text>
            </Card.Header>
            <Card.Divider/>
            <Card.Body>
                {outlineText}
            </Card.Body>
            <Card.Body>

            </Card.Body>
        </Card>
    );
}
