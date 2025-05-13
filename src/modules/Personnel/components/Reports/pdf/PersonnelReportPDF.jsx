import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
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
    marginTop: 10,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 5,
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
});

const PersonnelReportPDF = ({ data, selectedColumns, columnLabels, headerOptions }) => {
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
      <Page size="A4" orientation={headerOptions.orientation || "portrait"} style={styles.page}>
        <Text
          style={{
            position: "absolute",
            top: 10,
            marginBottom: 20,
            right: 20,
            fontSize: 10,
          }}
        >
          {new Date().toLocaleDateString("tr-TR")}
        </Text>
        {headerOptions?.showHeader && headerOptions.text && (
          <Text
            style={{
              ...styles.title,
              textAlign: headerOptions.align,
              fontSize: headerOptions.fontSize || 14,
              color: headerOptions.textColor || "#000000",
              backgroundColor: headerOptions.bgColor || "#ffffff",
            }}
          >
            {headerOptions.text}
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
        <Text style={{ position: "absolute", bottom: 10, textAlign: "center", fontSize: 10, left: "50%", transform: "translateX(-50%)" }} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </Page>
    </Document>
  );
};

export default PersonnelReportPDF;
