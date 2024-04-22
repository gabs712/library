const modal = document.querySelector('.modal')
const openModalButton = document.querySelector('.header-create')
const createBookButton = document.querySelector('.modal-create-button')
const cancelBookButton = document.querySelector('.modal-cancel-button')
const form = document.querySelector('.modal-form')
const booksGrid = document.querySelector('.books-grid')

const myLibrary = []

displayBooks()

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
  }
  
  toggleRead () {
    this.isRead = this.isRead ? false : true
  }
}

function addBookToLibrary() {
  const title = form.title.value
  const author = form.author.value
  const pages = form.pages.value
  const isRead = form.isRead.checked

  myLibrary.push(new Book(title, author, pages, isRead))
}

function displayBooks() {
  booksGrid.innerHTML = ''

  myLibrary.forEach((book, i) => {
    const newBookCard = document.createElement('div')
    newBookCard.classList.add('book-card')

    let readClass
    let readContent
    if (book.isRead) {
      readClass = 'book-read-button'
      readContent = 'Read'
    } else {
      readClass = 'book-notRead-button'
      readContent = 'Not Read'
    }
  
    newBookCard.innerHTML = `
      <div class="book-card-title">"${book.title}"</div>
      <div class="book-card-author">${book.author}</div>
      <div class="book-card-pages">${book.pages} pages</div>
      <div class="book-card-buttons">
        <button data-read class="${readClass}">${readContent}</button>
        <button data-remove class="book-remove-button" >Remove</button>
      </div>
    `

    newBookCard.querySelector('[data-read]').addEventListener('click', () => {
      book.toggleRead()
      displayBooks()
    })

    newBookCard.querySelector('[data-remove]').addEventListener('click', () => {
      myLibrary.splice(i, 1)
      displayBooks()
    })

    booksGrid.insertAdjacentElement('afterbegin', newBookCard)
  })
} 

form.addEventListener('submit', () => {
  addBookToLibrary()
  displayBooks()
  form.reset()
})

openModalButton.addEventListener('click', () => {
  modal.showModal()
})

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.close()
  }
})

cancelBookButton.addEventListener('click', () => {
  modal.close()
  form.reset()
})
