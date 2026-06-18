import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportProductsPdf =
  (products: any[]) => {

    const doc =
      new jsPDF();

    autoTable(doc, {

      head: [[
        "Code",
        "Name",
        "Price",
        "Stock"
      ]],

      body: products.map(
        product => [

          product.productCode,

          product.productName,

          product.price,

          product.stockQuantity

        ]
      )

    });

    doc.save(
      "products.pdf"
    );
  };