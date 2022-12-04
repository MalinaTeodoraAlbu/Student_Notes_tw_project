import { Note } from "../Models/model.js";
import { Folder } from "../Models/model.js";
import { User } from "../Models/model.js";
import { Op } from "sequelize";
import express from "express";


const router = express.Router()

// get all users 
router.get('/users', async (req, res, next) => {
    try {
      const query = {}
     
      const users = await User.findAll(query)
      res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  })
  
  //get all folders
  router.get('/folders', async (req, res, next) => {
    try {
      const query = {}
    
      const folders = await Folder.findAll(query)
      res.status(200).json(folders)
    } catch (err) {
      next(err)
    }
  })


  //get all notes
  router.get('/notes', async (req, res, next) => {
    try {
      const query = {}
      /*
      if (Object.keys(req.query).length !== 0) {
        const { minSalary, simplified } = req.query
        query.where = {}
        if (minSalary) {
          query.where.salary = {
            [Op.gt]: req.query.minSalary
          }
        }
        if (simplified === 'true') {
          query.attributes = {
            exclude: ['id']
          }
        }
        
      }*/
      const notes = await Note.findAll(query)
      res.status(200).json(notes)
    } catch (err) {
      next(err)
    }
  })

  
  router.get('/users/:eid', async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.eid)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } catch (err) {
      next(err)
    }
  })

  router.get('/folders/:eid', async (req, res, next) => {
    try {
      const folder = await Folder.findByPk(req.params.eid)
      if (folder) {
        res.status(200).json(folder)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } catch (err) {
      next(err)
    }
  })
  
  router.get('/notes/:eid', async (req, res, next) => {
    try {
      const note = await Note.findByPk(req.params.eid)
      if (user) {
        res.status(200).json(note)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } catch (err) {
      next(err)
    }
  })


  // insert
  router.post('/addusers', async (req, res, next) => {
    try {
      const newUser = await User.create(req.body, ['name','surname','email','password'])
      res.status(200).json(newUser);
    } catch (err) {
      next(err)
    }
  })

  router.post('/addfolders', async (req, res, next) => {
    try {
      const newFolder = await Folder.create(req.body)
      res.status(200).json(newFolder);
    } catch (err) {
      next(err)
    }
  })

  router.post('/addnotes', async (req, res, next) => {
    try {
      const newNote = await Note.create(req.body)
      res.status(200).json(newNote);
    } catch (err) {
      next(err)
    }
  })



    //update 
    router.put('/updateuser/:userId', async(req,res, next) => {
      try{
        const user = await User.findByPk(req.params.userId);
        if(user){
          await user.update(req.body,{fields: ['name','surname','email','password']});
         
          return res.status(200).json({message: 'accepted'});
        }else{
          return res.status(404).json({error: `User with id ${req.params.userId} not found`});
        }
  
      }catch(err){
        next(err)
      }
    })
  
    router.put('/updatefolders/:folderId', async(req,res, next) => {
      try{
        const folder = await Folder.findByPk(req.params.folderId);
        if(folder){
          await folder.update(req.body,{fields: ['title']});
         
          return res.status(200).json({message: 'accepted'});
        }else{
          return res.status(404).json({error: `Folder with id ${req.params.folderId} not found`});
        }
  
      }catch(err){
        next(err)
      }
    })


    router.put('/updatenotes/:noteId', async(req,res, next) => {
      try{
        const note = await Note.findByPk(req.params.noteId);
        if(note){
          await note.update(req.body,{fields: ['title','context','date']});
         
          return res.status(200).json({message: 'accepted'});
        }else{
          return res.status(404).json({error: `Note with id ${req.params.noteId} not found`});
        }
  
      }catch(err){
        next(err)
      }
    })
  
  
    //delete
    router.delete('/users/:userId', async(req, res, next) =>{
      try {
        const user = await User.findByPk(req.params.userId); 
        if (user) {
          await user.destroy();
          return res.status(200).json("User deleted successfully!");
        } else {
          return res
            .status(404)
            .json({ error: `User with id ${req.params.userId} not found` });
        }
      } catch (err) {
       next(err);
      }
    })

    router.delete('/folders/:folderId', async(req, res, next) =>{
      try {
        const folder = await Folder.findByPk(req.params.folderId); 
        if (folder) {
          await folder.destroy();
          return res.status(200).json("Folder deleted successfully!");
        } else {
          return res
            .status(404)
            .json({ error: `Folder with id ${req.params.folderId} not found` });
        }
      } catch (err) {
       next(err);
      }
    })

    router.delete('/notes/:noteId', async(req, res, next) =>{
      try {
        const note = await Note.findByPk(req.params.noteId); 
        if (note) {
          await note.destroy();
          return res.status(200).json("User deleted successfully!");
        } else {
          return res
            .status(404)
            .json({ error: `Note with id ${req.params.noteId} not found` });
        }
      } catch (err) {
       next(err);
      }
    })
  
  export { router as notiteRouter };