import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from "@react-pdf/renderer";
import { useEffect } from "react";

// Stil tanımı sabit
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
  },
  headerCell: {
    padding: 4,
    backgroundColor: "#eeeeee",
    fontWeight: "bold",
    flexGrow: 1,
  },
  cell: {
    padding: 4,
    flexGrow: 1,
    borderBottom: "1px solid #ccc",
  },
});

const PersonnelReportPDF = ({
  data,
  selectedColumns,
  columnLabels,
  headerOptions,
}) => {
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
      <Page
        size="A4"
        orientation={headerOptions.orientation || "portrait"}
        style={styles.page}
      >
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
              <Text key={i} style={styles.headerCell}>
                {columnLabels[col] ?? col}
              </Text>
            ))}
          </View>

          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {selectedColumns.map((col, colIndex) => {
                const val = row[col];
                const isDate =
                  typeof val === "string" && /^\d{4}-\d{2}-\d{2}T/.test(val);
                const text = isDate
                  ? `${new Date(val).getDate()}.${new Date(val).getMonth() + 1}.${new Date(val).getFullYear()}`
                  : val ?? "-";

                return (
                  <Text key={colIndex} style={styles.cell}>
                    {text}
                  </Text>
                );
              })}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PersonnelReportPDF;
