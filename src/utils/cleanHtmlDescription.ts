export const cleanHtmlDescription = (html: string): string => {
  // 1. Hapus <span class="ql-ui"...>...</span>
  let cleanedHtml = html.replace(/<span class="ql-ui"[^>]*>.*?<\/span>/g, "");

  // 2. Perbaiki struktur list (opsional, hanya jika ingin pisahkan <ol> dan <ul>)
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanedHtml, "text/html");

  const newContainer = document.createElement("div");
  let currentList: HTMLOListElement | HTMLUListElement | null = null;

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType === 1 && (node as HTMLElement).tagName === "OL") {
      const ol = node as HTMLOListElement;

      // Pisahkan berdasarkan atribut data-list
      Array.from(ol.children).forEach((li) => {
        const listType = li.getAttribute("data-list");

        let listTag: "ul" | "ol" = listType === "bullet" ? "ul" : "ol";
        if (!currentList || currentList.tagName.toLowerCase() !== listTag) {
          currentList = document.createElement(listTag);
          newContainer.appendChild(currentList);
        }

        li.removeAttribute("data-list");
        currentList.appendChild(li.cloneNode(true));
      });
    } else {
      currentList = null;
      newContainer.appendChild(node.cloneNode(true));
    }
  });

  return newContainer.innerHTML;
};
