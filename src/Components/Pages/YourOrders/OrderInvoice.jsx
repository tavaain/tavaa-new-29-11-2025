import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';


const OrderInvoice = ({ selectedOrder }) => {
    const getFormattedDate = () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // January is 0!
        const year = today.getFullYear();
      
        return `${day}-${month}-${year}`;
      };

    const styles = StyleSheet.create({
        page: { fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column' },

        spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: "#3E3E3E" },

        titleContainer: { flexDirection: 'row', marginTop: 24 },

        logo: { width: 50 },

        table: { width: '150px' },

        tableTd: { border: '1px solid #dddddd', textAlign: 'left', padding: '5px', alignItems: 'center', },

        titleWrapper: { flexDirection: 'column', alignItems: 'start', justifyContent: "center" },

        reportTitle: { fontSize: 18, textAlign: 'center', borderBottom: '1px solid red' },

        subTitle: { fontSize: 12, textAlign: 'center', justifyContent: 'center' },


        theader: { marginTop: 10, fontSize: 10, fontStyle: 'bold', paddingTop: 4, paddingLeft: 7, flex: 1, justifyContent: "center", height: 20, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },

        total: { marginTop: 10, fontSize: 10, fontStyle: 'bold', paddingTop: 4, paddingLeft: 7, flex: 1, height: 20, backgroundColor: '#1473d054', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },

        /* theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },*/

        tbody: { fontSize: 11, paddingTop: 4, paddingLeft: 7, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },


    });

    const InvoiceTitle = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View style={{ flexDirection: 'column', gap: '10px' }}>
                    <Image style={styles.logo} src="https://i.postimg.cc/85Gff873/bill.png" />
                    <Text style={styles.reportTitle}>Invoice</Text>
                    <Text style={styles.subTitle}>Create Date:{getFormattedDate()}</Text>
                    <Text style={styles.subTitle}>Order Date:{selectedOrder?.orderDate}</Text>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.reportTitle}>Kansa Pital</Text>
                    <Text style={styles.subTitle}>Address: Sarenga, Bankura, West Bangel 722150</Text>
                    <Text style={styles.subTitle}>City: Sarenga</Text>
                    <Text style={styles.subTitle}>Country: India</Text>
                    <Text style={styles.subTitle}>Postal: 722150</Text>
                </View>
            </View>
        </View>
    );

    const InvoiceFromAndTo = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View style={styles.titleWrapper}>
                    <Text style={{ fontSize: 14,  fontWeight: 'bold', borderBottom: '1px solid darkblue' }}>Bill from</Text>
                    <Text style={styles.subTitle}>Kansa Pital</Text>
                    <Text style={styles.subTitle}>Sarenga, Bankura, West Bangel 722150</Text>
                    <Text style={styles.subTitle}>+92 3625498723</Text>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={{ fontSize: 14,  fontWeight: 'bold', borderBottom: '1px solid darkblue' }}>Bill to</Text>
                    <Text style={styles.subTitle}>{selectedOrder?.customer?.name}</Text>
                    <Text style={styles.subTitle}>
                        {selectedOrder?.customer?.address?.Location} 
                        {" "}
                        {selectedOrder?.customer?.address?.zipCode}
                    </Text>
                    <Text style={styles.subTitle}>{selectedOrder?.customer?.phone}</Text>
                </View>
            </View>
        </View>
    );

    const TableHead = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={styles.theader}>
                <Text>Item</Text>
            </View>
            <View style={styles.theader}>
                <Text>Quantity</Text>
            </View>
            <View style={styles.theader}>
                <Text>Size</Text>
            </View>
            <View style={styles.theader}>
                <Text>Price</Text>
            </View>
        </View>
    );

    const TableBody = () => (
        !selectedOrder ? (
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={styles.tbody}>
                    <Text>Loading...</Text>
                </View>
            </View>
        ) : (
            selectedOrder?.items?.map((item) =>
                <View key={item._id} style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={styles.tbody}>
                        <Text>{item?.name}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{item?.quantity}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{item?.size}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{item?.price}</Text>
                    </View>
                </View>
            )
        )
    );

    const TotalAmount = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 14 }}>
            <View style={styles.theader}>
                <Text></Text>
            </View>
            <View style={styles.theader}>
                <Text></Text>
            </View>
            <View style={styles.theader}>
                <Text>Total Amount:</Text>
            </View>
            <View style={styles.theader}>
                <Text>{ selectedOrder?.totalAmount}</Text>
            </View>
        </View>
    );



    return (
        <>
            <Document>
                <Page size="A4" style={styles.page}>
                    <InvoiceTitle />
                    <InvoiceFromAndTo />
                    <TableHead />
                    <TableBody />
                    <TotalAmount />
                </Page>
            </Document>
        </>
    )
};

export default OrderInvoice;