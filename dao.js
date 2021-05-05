const { response } = require('express')
const { users, projects, categories } = require('./models/db')
const { encrypt } = require('./encryption')
const checkLoginReq = async (data) => {
    console.log("req.body", data)
    let param = {
        userName: data.username,
        password: data.password
    }
    return users.findOne({
        where: param,
        raw: true
    }).then(async (response) => {
        if (response) {
            let userDetails = await getUserDetails(response)
            return { "loginSuccess": "login success", "userDetails": userDetails }
        }
        else {
            return { "loginFailed": "invalidUserName" }
        }
    }).catch(error => {
        console.error(error)
        return { "loginFailed": "invalidUserName" }
    })
}

/**1. Please join the products table with users table (user_id is the primary key in the users table and user_id field is a foreign key in projects table) use that for join code.
also Left Join categories table (cid is the primary key in categories table and cid field is a foreign key in projects table) ..
 */
const getUserDetails = async (data) => {
    users.hasMany(projects, { foreignKey: 'userId' })
    projects.belongsTo(categories, { foreignKey: 'cid' })
    return users.findAll({
        where: {
            userId: data.userId
        },
        include: [{
            model: projects,
            attributes: ['project_id', 'project_name'],
            include: [{
                model: categories,
                attributes: ['cid', 'category']
            }]
        }],
        raw: true
    }).then(async (userDetails) => {
        userDetails.map(async(val) => {
            val.userName = val.userName;
            val.password = val.password;
            val.encryptedCredentials = await encrypt(val.userName, val.password)// md5 encryption
            val.projectId = val["projects.project_id"];
            val.ProjectName = val["projects.project_name"];
            val.categoryId = val["projects.category.cid"];
            val.category = val["projects.category.category"]
        })
        return { response: userDetails }
    }).catch(err => {
        console.log(err)
        return { response: "error in retriving your userDetails" }

    })
}

module.exports = {
    checkLoginReq,
    getUserDetails
}
