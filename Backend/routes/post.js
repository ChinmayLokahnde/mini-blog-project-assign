const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req,res)=>{
    const {title, content} = req.body;
    db.run(
        "INSERT INTO posts(title, content) VALUES(?, ?)",
        [title, content],
        function(err){
            if(err) return res.status(500).json({err: err.message});
            res.json({id: this.lastID, title, content});
        }
    );
});

router.get("/", (req,res)=>{
    db.all("SELECT * FROM posts ORDER BY created_at DESC", [],(err, rows)=>{
        if(err) return res.status(500).json({err:err.message});
        res.json(rows);
    })
});
 router.put("/", (req,res)=>{
    const {title, content}= req.body;
    const{id} = req.params;
    db.run(
        "UPDATE posts SET title=? content=? WHERE id =?",
        [title, content, id],
        function(err){
            if(err)return res.status(500).json({err:err.message});
            res.json({updated: this.changes});
        }
    )
 });

 router.delete("/:id", (req,res)=>{
    const {id} = req.params;
    db.run(
        "DELETE FROM posts WHERE id=?", 
        [id],
        function(err){
            if(err) return res.status(500).json({err:err.message});
            res.json({deleted: this.changes});
        }
     )
 });

 module.exports = router;
 
