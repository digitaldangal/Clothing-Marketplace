import React from 'react';
import { Table } from 'semantic-ui-react';

const Transaction = (props) => {
    const {transactionData} = props;
    return(
        <div className="page-container">
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Order Number</Table.HeaderCell>
                        <Table.HeaderCell>Order Date</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Options</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Object.values(transactionData).map((transaction, i)=>{
                        return(
                            <Table.Row key={i}>
                                <Table.Cell>{new Date(transaction.date).toLocaleDateString()}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}

export default Transaction;


/* 

Order Number
Order Placed
Amount
Status
View order details
Contact Us

*/