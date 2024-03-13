document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('bookList');
    const exportCSVButton = document.getElementById('exportCSV');

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const publisher = document.getElementById('bookPublisher').value;
        const year = document.getElementById('bookYear').value;
        const description = document.getElementById('bookDescription').value;

        const bookList = {
            title,
            author,
            publisher,
            year,
            description
        };

        addBookToList(title, author, publisher, year, description);

        // Limpiar formulario después del envío
        bookForm.reset();
    });

    function addBookToList(title, author, publisher, year, description) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${title}</td>
            <td>${author}</td>
            <td>${publisher}</td>
            <td>${year}</td>
            <td>${description}</td>
        `;
        bookList.appendChild(row);
    }

    exportCSVButton.addEventListener('click', function() {
        const rows = bookList.querySelectorAll('tr');
        let csv = 'Título,Autor,Editora,Ano de Publicação,Descrição\n';
        rows.forEach(row => {
            const columns = row.querySelectorAll('td');
            csv += `${columns[0].textContent},${columns[1].textContent},${columns[2].textContent},${columns[3].textContent},${columns[4].textContent}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'biblioteca.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
});