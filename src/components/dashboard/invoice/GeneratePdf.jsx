import { Document, Page, PDFViewer, Text, View } from "@react-pdf/renderer";
import styles from "./styles";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";

export default function GeneratePdf() {
  const PaymentHistoryPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, styles.titleBold]}>INVOICE</Text>
            <Text>Payments History</Text>
          </View>
          <View style={styles.spaceY}>
            <Text style={styles.titleBold}>URBANi</Text>
            <Text>123 Business Street</Text>
            <Text>Earth, State - Mars</Text>
          </View>
        </View>
        <View style={styles.spaceY}>
          <Text style={[styles.titleBold, styles.billTo]}>Bill To : </Text>
          <Text>Client Name : Admin</Text>
          <Text>Client Address : Earth, State - Mars</Text>
        </View>

        {/* Render the Table */}
        <Table>
          <TH>
            <TD>Header 1</TD>
            <TD>Header 2</TD>
          </TH>
          <TR>
            <TD>Data 1</TD>
            <TD>Data 2</TD>
          </TR>
        </Table>
      </Page>
    </Document>
  );
  return (
    <div>
      <div className="w-full h-screen">
        <PDFViewer width="100%" height="100%">
          <PaymentHistoryPDF />
        </PDFViewer>
      </div>
    </div>
  );
}
