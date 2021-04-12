require ('../src/db/mongoose')
const User = require('../src/models/user')

/* User.findByIdAndUpdate('6005f72dfa7c0a10cd596e37', { age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
 */
const updateAgeAndcount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndcount('6005f72dfa7c0a10cd596e37', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})