const createButton = document.querySelector('.header-create')
const modal = document.querySelector('.modal')


createButton.addEventListener('click', () => {
  modal.showModal()
})

modal.addEventListener('click', (e) => {
  if(e.target === modal) {
    modal.close()
  }
})