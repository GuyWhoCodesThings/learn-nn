import User from "../models/user.model.js";

export const signup = async (req, res) => {
    try {
        const uid = req.uid;
        
        if (typeof uid !== 'string') {
            res.status(400).send('id must be a string')
            return;
        }
        const userFound = await User.findOne({ uid })
        if (userFound) {
            return res.status(422).json({error: "user already exists"})
        } else {
            const newUser = new User({ uid: uid })
            await newUser.save()
            res.status(201).json({message: 'user created successfully'})
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const loadUserCode = async (req, res) => {

    try {
        const uid = req.uid;
        const url = req.query.url


        if (typeof url !== 'string') {
            res.status(400).send('url must be a string')
            return;
        }
        if (typeof uid !== 'string') {
            res.status(400).send('uid must be a string')
            return;
        }


        const currentUser = await User.findOne({uid})

        if (!currentUser) {
            res.status(400).send('user doesnt exist')
            return;
        }

        const problemIndex = currentUser.problems.findIndex(p => p.url === url);

        if (problemIndex >= 0) {
            
            res.status(200).json(currentUser.problems[problemIndex])
            return;

        } else {
           
            res.status(200).json({code: ''})
            return;
        }

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Server error" });
    }
    
}

export const saveUserCode = async (req, res) => {
    try {
        const uid = req.uid;
        const { url, code, completed, time } = req.body;
   
        if (typeof url !== 'string') {
            res.status(400).send('url must be a string');
            return;
        }
        if (typeof uid !== 'string') {
            res.status(400).send('id must be a string');
            return;
        }
        if (typeof code !== 'string') {
            res.status(400).send('code must be a string');
            return;
        }
        if (typeof completed !== 'boolean') {
            res.status(400).send('completed must be boolean');
            return;
        }
        if (typeof time !== 'number') {
            res.status(400).send('time must be a number');
            return;
        }

        const user = await User.findOne({ uid });

        if (!user) {
            return res.status(400).send('user doesnt exist');
        }

        const problemIndex = user.problems.findIndex(p => p.url === url);

        if (problemIndex >= 0) {
            
            user.problems[problemIndex].code = code;
            user.problems[problemIndex].time = time;
            if (completed) {
                user.problems[problemIndex].status = "completed";
            } else {
                user.problems[problemIndex].status = "attempted";
            }
            
        } else {

            if (completed) {
                user.problems.push({ url, code, status: "completed", time });
            } else {
                user.problems.push({ url, code, status: "attempted", time });
            }
            
        }

        await user.save();
        res.status(200).json({message: "saved code"});

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const load = async (req, res) => {

    try {
        const uid = req.uid;

        if (typeof uid !== 'string') {
            res.status(400).send('uid must be a string')
            return;
        }

        const currentUser = await User.findOne({uid})

        if (!currentUser) {
            res.status(400).send('user doesnt exist')
            return;
        }
        
       
        res.status(200).json(currentUser.problems)
       

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Server error" });
    }
    
}
