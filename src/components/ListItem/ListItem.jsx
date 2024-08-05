import { Card, CardBody, Checkbox } from "@chakra-ui/react";

import ListItemText from "../ListItemText/ListItemText";

const ListItem = ({ amount, itemName, unit }) => {
    return (
        <Card>
            <CardBody>
                <Checkbox>
                    <ListItemText amount={amount} itemName={itemName} unit={unit} />
                </Checkbox>
            </CardBody>
        </Card>
    )
}

export default ListItem;