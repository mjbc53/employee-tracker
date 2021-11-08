const inquirer = require('inquirer')
const Querys = require('./Querys')
const cTable = require('console.table')
const figlet = require('figlet')




class Prompts {
  constructor(){
    this.Query = new Querys()
  }
 
  startPrompts(){
    figlet.text('Welcome To \nEmployee Tracker', (err, data) => {
      if(err){
        console.log('something went wrong with figlet')
        return
      }
      console.log(data)
      this.generateTable()
    })

  }

  generateTable(){
    this.Query.getCompleteTable()

  }
}

module.exports = Prompts