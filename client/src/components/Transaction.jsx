import React from 'react';
import { Table, Grid } from 'semantic-ui-react';

const Transaction = (props) => {
    const {transactionData} = props;
    return(
        <div className="page-container ui container">
            <Grid className="computer tablet only">
                <Table celled fixed singleLine>
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
                                    <Table.Cell>{transaction.payment_info.payment.id}</Table.Cell>
                                    <Table.Cell>{new Date(transaction.date).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>$ {transaction.amount.total}</Table.Cell>
                                    <Table.Cell>{transaction.payment_info.payment.state}</Table.Cell>
                                    <Table.Cell>Contact US <br/> View Order</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </Grid>
            <Grid className="mobile only">
                <Table unstackable celled fixed singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Order Date</Table.HeaderCell>
                            <Table.HeaderCell>Options</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Object.values(transactionData).map((transaction, i)=>{
                            return(
                                <Table.Row key={i}>
                                    <Table.Cell>{new Date(transaction.date).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>Contact US <br/> View Order</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </Grid>
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