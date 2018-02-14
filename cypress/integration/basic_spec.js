it('main', () => {
  cy.visit('/basic')
  cy.get('#app').should($app => {
    console.log(window.location.href)
    expect($app).to.contain('home')
  })
  cy.get('button').click()
  cy.get('#app').should($app => {
    expect($app).to.contain('egoist')
  })
})
