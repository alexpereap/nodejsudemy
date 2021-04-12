require ('../src/db/mongoose')
const Task = require('../src/models/task')

/* Task.findByIdAndDelete('60087da61bf5322b3e30f9b4').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
 */
const deleteTaskAndCount = async (id, completed) => {
    await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed })
    return count
}

deleteTaskAndCount('6005f8d9fad05d160a623b57').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})