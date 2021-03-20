const adminHomeRender = async(req,res)=>{
    console.log('hej')

    res.render("adminPage.ejs")
}

module.exports = {
    adminHomeRender
}