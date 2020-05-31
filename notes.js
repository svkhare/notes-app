const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}

const addNote =  (title, body)  =>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote =(title) =>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length ){
        console.log(chalk.green("Note removed!"))
    }
    else{
        console.log(chalk.red("Note not found!"))
    }

    saveNotes(notesToKeep)
}

const listNote= () => {
    const notes = loadNotes()
    console.log(chalk.inverse.blue('Your Notes!'))

    notes.forEach((note) => {
        console.log(chalk.yellow(note.title))
    })
}

const readNode = (title)=> {
    const notes = loadNotes()
    const note = notes.find((note)=> note.title === title)

    if(note){
        console.log(chalk.inverse.blue(note.title))
        console.log(chalk.yellow(note.body))
    }
   else{
    console.log(chalk.red("Note not found!"))
   }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNode: readNode
}