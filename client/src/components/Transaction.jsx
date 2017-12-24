import React from 'react';
import { Table, Grid, Modal, Image, Header} from 'semantic-ui-react';

const Transaction = (props) => {
    const {transactionData, orderData} = props;
    const style = {
        mainStyle: {
            "text-align": "center"
        },
        image: {
            width: "20vw",
            margin: "0 auto"
        }
    }
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
                                    <Table.Cell>{transaction[0].payment_info.payment.id}</Table.Cell>
                                    <Table.Cell>{new Date(transaction[0].date).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>$ {transaction[0].amount.total}</Table.Cell>
                                    <Table.Cell>{transaction[0].payment_info.payment.state}</Table.Cell>
                                    <Table.Cell><a href={`mailto:streetwearboutiques@gmail.com?subject=Order Inquiry: ${transaction[0].payment_info.payment.id}"&body=User Id: ${transaction[0].user_uid} \n Order Date: ${transaction[0].date} \n Message: `} target="_blank">Contact Us</a><br/>
                                        <Modal closeOnDimmerClick={true} closeOnDocumentClick={true} closeIcon trigger={<a>View Order</a>}>
                                            <Modal.Header>{orderData[transaction[1]].product.title}</Modal.Header>
                                            <Modal.Content image>
                                                <Image wrapped size='medium' src={orderData[transaction[1]].product.main_image} style={style.image}/>
                                                <Modal.Description>
                                                    <Header>Order: {transaction[0].payment_info.payment.id}</Header>
                                                    <p>{orderData[transaction[1]].product.description}</p>
                                                    <p>Subtotal: ${transaction[0].amount.details.subtotal}</p>
                                                    <p>Shipping: ${transaction[0].amount.details.shipping}</p>
                                                    <p>Total: $${transaction[0].amount.details.total}</p>
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
                                    <Table.Cell>{new Date(transaction[0].date).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell><a href={`mailto:streetwearboutiques@gmail.com?subject=Order Inquiry: ${transaction[0].payment_info.payment.id}"&body=User Id: ${transaction[0].user_uid} \n Order Date: ${transaction[0].date} \n Message: `} target="_blank">Contact Us</a><br/>
                                        <Modal closeOnDimmerClick={true} closeOnDocumentClick={true} closeIcon trigger={<a>View Order</a>}>
                                            <Modal.Header>{orderData[transaction[1]].product.title}</Modal.Header>
                                            <Modal.Content image>
                                                <Image wrapped size='small' src={orderData[transaction[1]].product.main_image} />
                                                <Modal.Description>
                                                    <Header>Order: {transaction[0].payment_info.payment.id}</Header>
                                                    <p>{orderData[transaction[1]].product.description}</p>
                                                    <p>Subtotal: ${transaction[0].amount.details.subtotal}</p>
                                                    <p>Shipping: ${transaction[0].amount.details.shipping}</p>
                                                    <p>Total: $${transaction[0].amount.details.total}</p>
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