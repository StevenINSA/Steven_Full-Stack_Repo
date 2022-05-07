const express = require('express');
const uuid = require('uuid');
const router = express.Router();    //instead of doing 'app.get', we are gonna do "router.get" because we need to export the .get function
const members = require('../../Members');   //We have to change the path as we changed of file

router.get('/', (req, res) => res.json(members)); //that will send as a response the array 'members' as a JSON file
//As we set 'api/members' in server.js file, we can delete it.


// Get a single member
router.get('/:id', (req, res) => { //id is an url paramater and we can use req object to grab what's in there

    //res.send(req.params.id);    //print in the web page the number written in the url http://localhost:5500/api/members/2 => show 2

    const found = members.some(member => member.id === parseInt(req.params.id));   //will check if the id exists

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));    //filter take an array and filter with a condition. Warning: member.id is a number and req.params is a string
    } else {
        res.status(400).json({ msg: `Member with the id ${req.params.id} not found`});   //res.status will put the status 400 to the page and print the msg
    }
}); 

// Create a member (so we use a post request instead of get request)
router.post('/', (req,res) => {      //we can use the same route as router.get because it isn't the same method
    //res.send(req.body);     //We need to parse the data we received from the frontend. We can do it with express with middleware

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };
    //After receiving the data, we have to add it to our array of members. Before that, let's check if name and email are correctly sent
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: 'Please include a name and email'}); //if name or email are missing, rise a 400 status. Tips: when if without else, do a return to avoid error with headers
    }
    //Add the member
    members.push(newMember);
    //if using MongoDB: members.save(newMember);

    //Send a message in return to the frontend. Let's return the new member
    res.json({msg: 'Member created. Welcom!', newMember});
});  

// Update a member with a 'put request'
router.put('/:id', (req, res) => { 

    const found = members.some(member => member.id === parseInt(req.params.id));  //Check if id exists

    if(found){
        const updMember = req.body; //if id exists, store the data in a variable (email and name are in the body)  
        console.log(updMember);
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)){    //check if the id matchs with the request. Note that params are the data in the URL (:id) and body is the data sent from frontend
                member.name = updMember.name ? updMember.name : member.name;    //if updMember.name exists (i.e. correctly sent), update the name. Else, don't change it
                member.email = updMember.email ? updMember.email : member.email;

                res.json({msg: 'Member updated', member});
            } 
        }); 
    } else {
        res.status(400).json({ msg: `Member with the id ${req.params.id} not found`});  
    }
}); 

// Delete a member
router.delete('/:id', (req, res) => { 

    const found = members.some(member => member.id === parseInt(req.params.id));   

    if(found){
        res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});   //Let's return all the members
    } else {
        res.status(400).json({ msg: `Member with the id ${req.params.id} not found`});  
    }
});

module.exports = router;