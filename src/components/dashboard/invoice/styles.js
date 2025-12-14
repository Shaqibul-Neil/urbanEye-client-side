import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#e5edf0",
    color: "#1e293b",
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: "30px 50px",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    marginBottom: 6,
  },

  titleBold: {
    fontFamily: "Helvetica-Bold",
  },

  spaceY: {
    flexDirection: "column",
    gap: 2,
    marginBottom: "20px",
  },

  billTo: {
    marginBottom: 4,
  },

  tableMargin: {
    marginTop: 12,
  },

  tableHeader: {
    backgroundColor: "#d4dde2",
  },

  tableNoStyle: {
    flex: 0.5,
    padding: 4,
    fontSize: 9,
  },

  tableEmailStyle: {
    flex: 2.5,
    padding: 6,
    fontSize: 9,
    lineHeight: 1.2,
  },

  tableCellStyle: {
    flex: 1,
    padding: 6,
    fontSize: 9,
    lineHeight: 1.2,
  },

  totals: {
    marginTop: 12,
    alignItems: "flex-end",
  },
});

export default styles;
