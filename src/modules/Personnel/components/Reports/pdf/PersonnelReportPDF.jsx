import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { useEffect } from "react";

// Stil tanımı sabit
const styles = StyleSheet.create({
  page: {
    padding: 14,
    fontSize: 10,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 2,
    marginTop: 2,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
  },
  headerCell: {
    padding: 4,
    backgroundColor: "#eeeeee",
    fontWeight: "bold",
    border: "1px solid #333",
    textAlign: "center",
    textTransform: "uppercase",
  },
  cell: {
    padding: 4,
    border: "1px solid #ccc",
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 2,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const PersonnelReportPDF = ({ data, selectedColumns, columnLabels, customPageTitle, pageOptions }) => {
  useEffect(() => {
    Font.register({
      family: "Roboto",
      src: "/fonts/Roboto-Regular.ttf",
      fontStyle: "normal",
      fontWeight: "normal",
    });
  }, []);

  return (
    <Document>
      <Page size="A4" orientation={pageOptions.orientation || "portrait"} style={styles.page}>
        <Text
          style={{
            position: "absolute",
            top: 10,
            marginBottom: 30,
            right: 20,
            fontSize: 10,
          }}
        >
          {new Date().toLocaleDateString("tr-TR")}
        </Text>
        {pageOptions?.showLogo && <Image style={{ ...styles.image }} src="https://placehold.co/100x100" /> }
        {customPageTitle?.showTitle && customPageTitle.text && (
          <Text
            style={{
              ...styles.title,
              textAlign: customPageTitle.align,
              fontSize: customPageTitle.fontSize || 14,
              color: customPageTitle.textColor || "#000000",
              backgroundColor: customPageTitle.bgColor || "#ffffff",
            }}
          >
            {customPageTitle.text}
          </Text>
        )}

        <View style={styles.table}>
          <View style={styles.row}>
            {selectedColumns.map((col, i) => (
              <Text
                key={i}
                style={{
                  ...styles.headerCell,
                  width: `${100 / selectedColumns.length}%`,
                }}
              >
                {columnLabels[col] ?? col}
              </Text>
            ))}
          </View>

          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {selectedColumns.map((col, colIndex) => {
                const val = row[col];
                const isDate = typeof val === "string" && /^\d{4}-\d{2}-\d{2}T/.test(val);
                const text = isDate ? `${new Date(val).getDate()}.${new Date(val).getMonth() + 1}.${new Date(val).getFullYear()}` : val ?? "-";

                return (
                  <Text
                    key={colIndex}
                    style={{
                      ...styles.cell,
                      width: `${100 / selectedColumns.length}%`,
                    }}
                  >
                    {text}
                  </Text>
                );
              })}
            </View>
          ))}
        </View>
        <Text style={{ position: "absolute", bottom: 10, textAlign: "center", fontSize: 10, left: 0, right: 0 }} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </Page>
    </Document>
  );
};

export default PersonnelReportPDF;
