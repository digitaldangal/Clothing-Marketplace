import React from 'react';
import { Table, Grid, Modal, Button, Image, Header} from 'semantic-ui-react';

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
                                    <Table.Cell><a href={`mailto:streetwearboutiques@gmail.com?subject=Order Inquiry: ${transaction.payment_info.payment.id}"&body=User Id: ${transaction.user_uid} \n Order Date: ${transaction.date}`} target="_blank">Contact Us</a><br/> View Order</Table.Cell>
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
                                    <Table.Cell><a href={`mailto:streetwearboutiques@gmail.com?subject=Order Inquiry: ${transaction.payment_info.payment.id}"&body=User Id: ${transaction.user_uid} \n Order Date: ${transaction.date} \n Message: `} target="_blank">Contact Us</a><br/>
                                        <Modal closeOnDimmerClick={true} closeOnDocumentClick={true} closeIcon trigger={<a>Show Modal</a>}>
                                            <Modal.Header>Select a Photo</Modal.Header>
                                            <Modal.Content image>
                                            <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
                                            <Modal.Description>
                                                <Header>Default Profile Image</Header>
                                                <p>We've found the following gravatar image associated with your e-mail address.</p>
                                                <p>Is it okay to use this photo?</p>
                                            </Modal.Description>
                                            </Modal.Content>
                                        </Modal>
                                    </Table.Cell>
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