import { useState, useEffect } from 'react';
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import styles from "./styles";
import useAuth from "../../../hooks/auth & role/useAuth";

const TableHeader = () => (
  <TH style={styles.tableHeader} fixed>
    <TD style={styles.tableNoStyle}>No</TD>
    <TD style={styles.tableEmailStyle}>Paid By</TD>
    <TD style={styles.tableCellStyle}>Payment Type</TD>
    <TD style={styles.tableCellStyle}>Amount</TD>
    <TD style={styles.tableCellStyle}>Date</TD>
  </TH>
);

export default function GeneratePdf({ paymentsPDF }) {
  const { user } = useAuth();
  const total = paymentsPDF.reduce((sum, p) => sum + p.amount, 0);
  const [PDFLib, setPDFLib] = useState(null);

  useEffect(() => {
    import('@react-pdf/renderer').then((lib) => {
      setPDFLib(lib);
    });
  }, []);

  if (!PDFLib) return <div>Loading PDF...</div>;

  const { Document, Page, PDFDownloadLink, PDFViewer, Text, View } = PDFLib;

  const PaymentHistoryPDF = ({ paymentsPDF, user, total }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header – every page */}
        <View style={styles.header} fixed>
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

        {/* Bill To */}
        <View style={[styles.spaceY]}>
          <Text style={[styles.titleBold, styles.billTo]}>Bill To :</Text>
          <Text>Name : {user?.displayName}</Text>
          <Text>Email : {user?.email}</Text>
          <Text>Address : Earth, State - Mars</Text>
        </View>

        {/* Table */}
        <Table style={styles.tableMargin}>
          <TableHeader />

          {paymentsPDF.map((payment, i) => (
            <TR key={payment._id} wrap={false}>
              <TD style={styles.tableNoStyle}>{i + 1}</TD>
              <TD style={styles.tableEmailStyle}>{payment.citizenEmail}</TD>
              <TD style={styles.tableCellStyle}>{payment.paymentType}</TD>
              <TD style={styles.tableCellStyle}>${payment.amount}</TD>
              <TD style={styles.tableCellStyle}>
                {new Date(payment.paidAt).toLocaleDateString()}
              </TD>
            </TR>
          ))}
        </Table>

        {/* Total */}
        <View style={styles.totals} wrap={false}>
          <Text style={[styles.title, styles.titleBold]}>Total : ${total}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="w-full h-[500px]">
        <PDFViewer width="100%" height="100%">
          <PaymentHistoryPDF
            paymentsPDF={paymentsPDF}
            user={user}
            total={total}
          />
        </PDFViewer>
      </div>

      <div className="mt-6 flex justify-center">
        <PDFDownloadLink
          document={
            <PaymentHistoryPDF
              paymentsPDF={paymentsPDF}
              user={user}
              total={total}
            />
          }
          fileName="payment-history.pdf"
        >
          {({ loading }) => (
            <button className="btn btn-primary">
              {loading ? "Generating..." : "Download File"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
