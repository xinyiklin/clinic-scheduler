import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function PdfPreviewDocument({
  file,
  numPages,
  pageHeight,
  pageWidth,
  pageRefs,
  onLoadSuccess,
  onPageRenderSuccess,
}) {
  const pageSizeProps = pageHeight
    ? { height: pageHeight }
    : { width: pageWidth };

  return (
    <Document
      className="mx-auto flex w-max max-w-full flex-col items-center gap-5"
      file={file}
      loading={null}
      error={<PdfMessage>Unable to render this PDF.</PdfMessage>}
      onLoadSuccess={onLoadSuccess}
    >
      {Array.from(new Array(numPages), (_item, index) => (
        <div
          key={`page-${index + 1}`}
          ref={(node) => {
            if (pageRefs) pageRefs.current[index] = node;
          }}
          className="bg-white shadow-[0_18px_45px_rgba(15,23,42,0.14)]"
        >
          <Page
            pageNumber={index + 1}
            loading={null}
            onRenderSuccess={onPageRenderSuccess}
            {...pageSizeProps}
          />
        </div>
      ))}
    </Document>
  );
}

function PdfMessage({ children }) {
  return (
    <div className="flex min-h-72 min-w-72 items-center justify-center rounded-xl border border-dashed border-cf-border bg-cf-surface text-sm font-semibold text-cf-text-muted">
      {children}
    </div>
  );
}
